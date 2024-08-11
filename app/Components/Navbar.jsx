"use client";
import React from "react";
import Link from "next/link";
import BasicMenu from "./Hamburger";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <>
      <div className="bg-black p-8 flex flex-row justify-between items-center text-white gap-20">
        <Link href="/" className="cursor-pointer">
          <div className="text-3xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              className="w-10 h-10"
            >
              <path
                fill="#FFD43B"
                d="M352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4L294.4 28.8c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0L416 0l32 0 16 0c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8c0 26.5-21.5 48-48 48l-21.5 0c-17 0-33.3-6.7-45.3-18.7L480 160l-32 0 0 21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1C640 462.9 590.9 512 530.2 512L496 512l-64 0L32.3 512c-3.3 0-6.6-.4-9.6-1.4C13.5 507.8 6 501 2.4 492.1C1 488.7 .2 485.2 0 481.4c-.2-3.7 .3-7.3 1.3-10.7c2.8-9.2 9.6-16.7 18.6-20.4c3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1c0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1l0-45.5 0-57zM512 72.3c0-.1 0-.2 0-.3s0-.2 0-.3l0 .6zm-1.3 7.4L464.3 68.1c-.2 1.3-.3 2.6-.3 3.9c0 13.3 10.7 24 24 24c10.6 0 19.5-6.8 22.7-16.3zM130.9 116.5c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87 0 27.5c0 32.8 8.4 64.8 24 93l-232 0c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7L171 232.3 18.4 255.8c-7 1.1-13.9-2.6-16.9-9s-1.5-14.1 3.8-18.8L130.9 116.5z"
              />
            </svg>
          </div>
        </Link>

        <div className="sm:ml-auto hidden sm:block sm:flex sm:flex-row gap-10 ">
          <button
            onClick={() => router.push("/About")}
            className="cursor-pointer"
          >
            About
          </button>

          <button
            onClick={() => router.push("/Media")}
            className="cursor-pointer"
          >
            Media
          </button>

          <button
            onClick={() => router.push("/Contact")}
            className="cursor-pointer"
          >
            Contact
          </button>

          {session?.user.role === "admin" && status == "authenticated" ? (
            <Link
              href={`/admin?id=${session.user.id}`}
              className="cursor-pointer "
            >
              <div>Admin</div>
            </Link>
          ) : (
            ""
          )}

          {session && status == "authenticated" ? (
            <Link href="/api/auth/signout?callbackUrl=/">
              <div>Logout</div>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <div>Login</div>
            </Link>
          )}
        </div>

        <div className=" flex flex-row ">
          <div className="sm:hidden block flex justify-end items-end ml-auto">
            <BasicMenu />
          </div>
          <div className="cursor-pointer rounded-full border-2 border-yellow-500 p-1">
            {/*Facebook logo */}
            <Link href="https://www.facebook.com/goldendrakes.mcpisa/">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8"
              >
                <path
                  fill="#FFD43B"
                  d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                />
              </svg>
            </Link>
          </div>
          <div className="cursor-pointer rounded-full border-2 border-yellow-500 p-1">
            {/*Instagram Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-8 h-8"
            >
              <path
                fill="#FFD43B"
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-primary p-6  ">
        <h2 className="text-center text-white text-3xl font-semibold ">
          Official Website of{" "}
          <span className="text-yellow-400 font-bold border-b-4 border-double border-yellow-400 whitespace-nowrap">
            {" "}
            Yellow Dragon Club{" "}
          </span>
        </h2>
      </div>
    </>
  );
};

export default Navbar;
