"use client";
import React, { useState } from "react";
import Image from "next/image";
import BasicSwitches from "../utils/switch";
import { useSearchParams } from "next/navigation";
const Adminpage = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(false);
  const maxLimit = 3;
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPublic, setShowPublic] = useState(false);
  const searchParams = useSearchParams();
  const paramsID = searchParams.get("id");

  // Handle the title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const newFiles = e.target.files;
    if (images.length + newFiles.length > maxLimit) {
      setLimit(true);
      return;
    }
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  // creating a folder in s3 bucket
  const handleS3CreateFolder = async (e) => {
    try {
      const res = await fetch("/api/create-bucket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderName: title, showPublic }), // Include showPublic state
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error);
        setMessage("");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setMessage("");
    }
  };

  // Uploading images to s3 bucket
  const handleS3Upload = async () => {
    const uploadedURLs = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("folderName", title);
      console.log("formdata", formData)
      try {
        const res = await fetch("/api/s3-upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          uploadedURLs.push(data.url);
        } else {
          throw new Error("Image upload failed");
        }
      } catch (err) {
        console.error("Error uploading image: ", err);
        setError("Error uploading images");
        return [];
      }
    }
    return uploadedURLs;
  };

  //Saving to the database
  const handlePostData = async (e) => {
    e.preventDefault();
    try {
      // Creating a Folder inside the s3 bucket
      await handleS3CreateFolder();
      // Upload images and get URLs
      const uploadedImageURLs = await handleS3Upload();

      if (uploadedImageURLs.length === 0) {
        throw new Error("No images uploaded");
      }

      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: paramsID,
          title: title,
          images: uploadedImageURLs,
          showPublic: showPublic,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Post created successfully");
        setError("");
        console.log("success");
      } else {
        setError(data.error);
        setMessage("");
      }
    } catch (err) {
      console.error("Error in handlePostData: ", err);
      setError("An unexpected error occurred");
      setMessage("");
    }
  };

  const handleSwitchChange = (e) => {
    setShowPublic(e.target.checked); // Update the state when the switch is toggled
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload Images</h1>
      <form onSubmit={handlePostData}>
        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
            placeholder="Titolo della Cartella"
          />
        </div>
        <div className="mb-6">
          {limit ? (
            <h2 className="text-red-500">
              You reached the limit of allowed photos
            </h2>
          ) : (
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          )}
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                key={index}
                className="w-32 h-32 overflow-hidden rounded-lg border border-gray-200"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  width={150}
                  height={150}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <h2 className="text-xs text-center mt-1">{image.name}</h2>
              </div>
            ))}
        </div>
        <div className="flex items-center mb-6">
          <BasicSwitches checked={showPublic} onChange={handleSwitchChange} />
          <label className="ml-2 font-semibold">Show to the public</label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </div>
  );
};

export default Adminpage;
