"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CircularIndeterminate from "../utils/loading";
import Link from "next/link";
const Gallery = () => {
  const [postdata, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetData = async () => {
      setLoading(true); // Start loading
      try {
        const res = await fetch(`/api/post/`);
        if (res.ok) {
          const data = await res.json();
          setPostData(data);
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    handleGetData();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-4xl font-bold text-center mb-5 text-white">Gallery</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularIndeterminate />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center cursor-pointer w-full h-full">
          {postdata.length > 0 ? (
            postdata.map((post, index) => (
              <div key={index}>
                {post.images && post.images.length > 0 && (
                 <Link href={`/Media/${post.title}?title=${post.title}&postid=${post._id}`}>
                  <div className="p-2 hover:animate-bounce">
                    <Image
                      src={post.images[0]}
                      width={250}
                      height={250}
                      alt="p"
                      className="rounded-lg border border-4  border-yellow-500 border-double w-full h-full"
                    />
                  </div>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white">
              No media available.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
