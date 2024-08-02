"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CircularIndeterminate from "../utils/loading";
import DeleteModal from "../utils/deleteModal";
import DeleteFolderAlert from "../utils/deleteAlert";

const MediaComponent = () => {
  const { data: session, status } = useSession();
  const [postdata, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/`);
        if (res.ok) {
          const data = await res.json();
          setPostData(data);
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    handleGetData();
  }, []);

  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => {
        setIsDeleted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isDeleted]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full ">
      <div className="bg-black p-8">
        <div className="flex justify-center items-center mt-5 relative">
          <h2 className="text-3xl text-yellow-400 font-bold border-b-4 border-double border-yellow-400">
            Media
          </h2>
        </div>
      </div>

      {isDeleted && (
        <div className="fixed inset-0 flex justify-center items-center min-h-screen z-50">
          <div className="transform -translate-y-1/2 top-1/2">
            <DeleteFolderAlert />
          </div>
        </div>
      )}

      <div className="flex-grow  ">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-yellow-300 ">
          {postdata.length > 0 ? (
            postdata.map((post, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center  bg-white  rounded-lg border-4 border-black cursor-pointer hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 relative "
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {post.images && post.images.length > 0 && (
                  <div className="mb-4 w-full h-58 sm:h-48 shadow-lg  overflow-hidden relative b">
                    <Image
                      src={post.images[0]}
                      width={300}
                      height={200}
                      alt={`Image for ${post.title}`}
                      className="object-cover w-full h-full  "
                    />
                  </div>
                )}

                {hoveredIndex === index && (
                  <div className="absolute top-36 sm:top-20 flex justify-center items-center">
                    {session?.user.role === "admin" && (
                      <DeleteModal
                        postdata={postdata}
                        setPostData={setPostData}
                        postid={post._id}
                        setIsDeleted={setIsDeleted}
                      />
                    )}
                  </div>
                )}

                <h2 className="text-xl font-bold mb-4 text-center whitespace-normal">
                  {post.title}
                </h2>
                <h2 className="text-xl font-bold mb-4 text-center">
                  {post._id}
                </h2>
                <Link
                  href={`/Media/${post.title}?title=${post.title}&postid=${post._id}`}
                  className="hover:underline mt-2 text-blue-600"
                >
                  <h2 className="no-underline">
                    <span className="font-bold">Clicca qui</span> per vedere
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
      </div>
    </div>
  );
};

export default MediaComponent;
