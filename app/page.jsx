"use client"
import Image from "next/image";
import Hero from "./Components/Hero";
import { Footer } from "./Components/Footer";
import Gallery from "./Components/Gallery";
import { SessionProvider, useSession } from "next-auth/react";
export default function Home() {
  const {data:session, status} = useSession();
  return (
      <div>
      <h2>{session?.user.name}</h2>
      <h2>{session?.user.role}</h2>
        <Hero/>
        <Gallery/>
        <Footer/>
      </div>
 
  );
}
