"use client";
import React, { useState } from "react";
import Image from "next/image";
const Adminpage = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(false);
  const maxLimit = 3;
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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

  // Handle the upload process
  //   const handleUpload = async () => {
  //     if (title === "" || images.length === 0) {
  //       alert("Please provide a title and select files to upload.");
  //       return;
  //     }

  //     // Prepare FormData for upload
  //     const formData = new FormData();
  //     formData.append("title", title);
  //     images.forEach((image) => {
  //       formData.append("files", image);
  //     });

  //     try {
  //       const response = await fetch("/api/upload", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (response.ok) {
  //         alert("Upload successful!");
  //         setTitle("");
  //         setImages([]);
  //       } else {
  //         const error = await response.text();
  //         alert(`Upload failed: ${error}`);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading files:", error);
  //       alert("An error occurred while uploading files.");
  //     }
  //   };
  

  // creating a folder in s3 bucket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/create-bucket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ folderName: title }),
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
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Upload Images</h1>
      <form onSubmit={handleSubmit}>
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
