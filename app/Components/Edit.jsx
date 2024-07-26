"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const EditComponent = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(false);
  const maxLimit = 3;
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const paramsTitle = searchParams.get("title");
  const paramsId = searchParams.get("postID");

  // Handle file input change
  const handleFileChange = (e) => {
    const newFiles = e.target.files;
    if (images.length + newFiles.length > maxLimit) {
      setLimit(true);
      return;
    }
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  // Uploading images to s3 bucket
  const handleS3Upload = async () => {
    const uploadedURLs = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      // Get the folder name from Query params
      formData.append("folderName", paramsTitle);

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

  // Updating DB by adding new images
  const handleUpdateData = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button
    try {
      const updatedImagesUrls = await handleS3Upload();
      if (updatedImagesUrls.length === 0) {
        throw new Error("No images uploaded");
      }
      const res = await fetch(`/api/edit/${paramsId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: updatedImagesUrls,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Updated successfully");
        setError("");
      } else {
        setError(data.error);
        setMessage("");
      }
    } catch (err) {
      console.log("Error in updating", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Stai editando il cartello test4
      </h1>
      <form onSubmit={handleUpdateData}>
        <div className="mb-6">
          <input
            type="text"
            value={paramsTitle}
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
              className="p-2 border border-gray-300 rounded-lg w-full"
              onChange={handleFileChange}
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

        <button
          type="submit"
          className="px-10 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Uploading..." : "Aggiungi Foto"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </div>
  );
};

export default EditComponent;
