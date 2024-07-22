import Image from "next/image";
import Hero from "./Components/Hero";
import { Footer } from "./Components/Footer";
import Gallery from "./Components/Gallery";
export default function Home() {
  return (
      <div>
        <Hero/>
        <Gallery/>
        <Footer/>
      </div>
 
  );
}
