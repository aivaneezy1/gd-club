"use client";
import React, { useState, useEffect } from "react";
import CircularIndeterminate from "@/app/utils/loading";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import BasicModal from "@/app/utils/zoom";
import Link from "next/link";
const Page = () => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const searchParams = useSearchParams();

  const postID = searchParams.get("postid");
  const paramsTitle = searchParams.get("title");

  useEffect(() => {
    const handleGetPost = async () => {
      try {
        const res = await fetch(`/api/post/${postID}`);
        if (res.ok) {
          const data = await res.json();
          setPostData(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    handleGetPost();
  }, [postID, paramsTitle]);

  // Delete API
  const handleDeletePost = async (imageUrl) => {
    try {
      const res = await fetch(`/api/delete/${postID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagesToRemove: [imageUrl] }),
      });
      if (res.ok) {
        // Updating the new document after DELETION
        const updatedPost = await res.json();
        setPostData(updatedPost);
      } else {
        console.error("Failed to delete image");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <>
      <div className="bg-black p-4">
        <div className="flex justify-center items-center mt-5">
          <h2 className="text-3xl text-yellow-500 font-bold border-b-4 border-double border-yellow-400">
            title
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 p-4">
        {/*Carica Image */}
        <Link href={`/edit?title=${paramsTitle}&postID=${postID}`}>
          <div className="flex flex-col justify-center items-center border-4 border-black rounded-lg w-full h-72 sm:h-72 border-dotted">
            <label className="flex flex-col justify-center gap-1 items-center bg-transparent p-4 text-4xl text-gray-600 cursor-pointer whitespace-nowrap  ">
              <input type="file" className="hidden" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                />
              </svg>
              Carica una foto
            </label>
          </div>
        </Link>
        {postData && postData.images && postData.images.length > 0 ? (
          postData.images.map((img, index) => (
            <div
              className="border-8 border-black rounded-lg w-full h-72 sm:h-72 relative"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={img}
                width={250}
                height={250}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer"
              />

              {/* Render a zoom button if a user hover */}
              {hoveredIndex === index && (
                <div className="absolute top-0 right-0">
                  <BasicModal image={img} />
                </div>
              )}


              {/*To change the delete button */}
              {/*Delete button */}
              {hoveredIndex === index && (
                <div className="absolute top-0 right-50">
                  <button
                    onClick={() => handleDeletePost(img)}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-8 h-8 "
                    >
                      <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-white">
            No media available.
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
