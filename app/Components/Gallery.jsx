import React from "react";
import Image from "next/image";
import Link from "next/link";

const Gallery = () => {
  return (
    <div className="mt-10">
      <h2 className="text-4xl font-bold text-center mb-5">Gallery</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 place-items-center cursor-pointer">
        <div className="p-2 hover:animate-bounce">
          <Image
            src="/soa2.jpg"
            width={250}
            height={250}
            alt="p"
            className="rounded-lg border border-4 p-2 border-yellow-500 border-double"
          />
        </div>
        <div className="p-2 hover:animate-bounce">
          <Image
            src="/soa2.jpg"
            width={250}
            height={250}
            alt="p"
            className="rounded-lg border border-4 p-2  border-yellow-500 border-double"
          />
        </div>
        <div className="p-2 hover:animate-bounce">
          <Image
            src="/soa2.jpg"
            width={250}
            height={250}
            alt="p"
            className="rounded-lg border border-4 p-2  border-yellow-500 border-double"
          />
        </div>
        <div className="p-2 hover:animate-bounce">
          <Image
            src="/soa2.jpg"
            width={250}
            height={250}
            alt="p"
            className="rounded-lg border border-4 p-2  border-yellow-500 border-double"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
