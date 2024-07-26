"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import CircularIndeterminate from "../utils/loading";
import Link from "next/link";

const MediaPage = () => {
  const { data: session, status } = useSession();
  const [postdata, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true); // Start loading
      try {
        const res = await fetch(`/api/post/`);
        if (res.ok) {
          const data = await res.json();
          setPostData(data);
          console.log("data", data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // End loading
      }
    };

    handleGetData();
  }, [session?.user.id]); // Adjust dependency to use session ID

  //DELETE FOLDER API

  const handleDeleteFolder = async (id) => {
    try {
      const res = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (res.ok) {
        setPostData(postdata.filter((post) => post._id !== id));
      }
    } catch (err) {
      console.log(err);
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
      <div className="bg-black p-8">
        <div className="flex justify-center items-center mt-5">
          <h2 className="text-3xl text-yellow-400 font-bold border-b-4 border-double border-yellow-400">
            Media
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {postdata.length > 0 ? (
          postdata.map((post, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-white p-4 rounded-lg border-8 border-yellow-600  cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-transform duration-300  relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {post.images && post.images.length > 0 && (
                <div className="mb-4 w-full h-58 sm:h-48 rounded-lg shadow-lg relative">
                  <Image
                    src={post.images[0]}
                    width={300} // Larger size for album effect
                    height={200} // Larger size for album effect
                    alt={`Image for ${post.title}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              )}

              {hoveredIndex === index && (
                <div className="absolute top-36 sm:top-20 flex justify-center items-center">
                  <button
                    className=" px-6 py-4  bg-red-500 rounded-lg text-white font-semibold"
                    onClick={() => handleDeleteFolder(post._id)}
                  >
                    Remove
                  </button>
                </div>
              )}

              <h2 className="text-xl font-bold mb-4 text-center whitespace-normal">
                {post.title}
              </h2>
              <h2 className="text-xl font-bold mb-4 text-center ">
                {post._id}
              </h2>
              <Link
                href={`/Media/${post._id}?postid=${post._id}`} // Adjust this URL as necessary
                className=" hover:underline mt-2 "
              >
                <h2 className="text-blue-600 no-underline">
                  {" "}
                  <span className="font-bold ">Clicca qui</span> per vedere
                  altre foto
                </h2>
              </Link>
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

export default MediaPage;
