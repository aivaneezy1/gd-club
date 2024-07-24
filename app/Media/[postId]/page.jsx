"use client";
import React, { useState, useEffect } from "react";
import CircularIndeterminate from "@/app/utils/loading";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import BasicModal from "@/app/utils/zoom";

const Page = () => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const searchParams = useSearchParams();

  const postID = searchParams.get("postid");

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
  }, [postID]);

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
            {postData?.title ? postData.title : ""}
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-5">
        {postData && postData.images && postData.images.length > 0 ? (
          postData.images.map((img, index) => (
            <div
              className="border-8 border-black rounded-lg w-full h-72 sm:h-72 relative"
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setClickedIndex(index)}
            >
              <Image
                src={img}
                width={250}
                height={250}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full cursor-pointer"
              />

              {/*Render a zoom button if a user hover */}
              {hoveredIndex === index && (
                <div className="absolute top-0 right-0">
                  <BasicModal image={img} />
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
