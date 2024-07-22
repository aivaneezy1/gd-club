import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      {/*Pictures */}
      <div className="flex flex-col md:flex-row justify-center items-center relative">
        <div>
          <Image
            src="/soa.jpg"
            width={1000}
            height={500}
            alt="soa"
        
          />
        </div>
        <div>
          <Image src="/soaBlack.jpg" width={1000} height={500} alt="soa" />
        </div>
        <div className="absolute text-4xl text-yellow-500 font-bold text-center w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-55">
          <h2 className="m-8">A motorcycle club also known as</h2>
          <h2 className="m-8">Golden Drakes </h2>
          <h2 className="m-8">with its roots in Italy </h2>
        </div>
      </div>

  
      {/*Welcome Sign and chapter of the club */}
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="sm:w-1/2 mt-4 sm:mt-0 bg-black p-8">
          <h2 className="text-3xl font-bold text-center sm:text-left mt-4 text-white">Welcome</h2>
          <h2 className="mt-4 text-center text-yellow-500">
            The Shadow Riders Motorcycle Club was founded in 1984 by a group of
            motorcycle enthusiasts who shared a passion for riding and a
            commitment to community service. The club started with just 10
            members who often rode together through the scenic routes of Oregon,
            seeking adventure and camaraderie.
          </h2>
          <h2 className="mt-4 text-center text-yellow-500">
            The SRMC is known for its annual charity rides and fundraisers.
            Every year, they host the "Ride for the Shadows," a charity ride
            that raises funds for local homeless shelters and food banks. They
            also participate in community clean-up events and provide support
            for veterans through various initiatives.
          </h2>
        </div>
        <div className="sm:w-1/2 mt-4 sm:mt-0">
          <Image 
            src="/soa2.jpg" 
            width={1000} height={500} 
            alt="soa"/>
        </div>
      </div>

      {/*Chapter of the club */}
      <div className="flex flex-col md:flex-row justify-center items-center h-full">
        <div className="sm:w-1/2">
          <Image 
            src="/soa3.jpg" 
            width={1000} height={500} 
            alt="soa"
            className="hidden sm:block"/>
            
            {/*Mobile Navigation it will show this text and hide the image */}
             <div className="block sm:hidden sm:w-1/2 mt-4 sm:mt-0 bg-black p-8 h-full ">
          <h2 className="text-3xl font-bold text-center sm:text-left mt-4 text-white">Chapter</h2>
          <h2 className="mt-4 text-center text-yellow-500">
            The Shadow Riders Motorcycle Club was founded in 1984 by a group of
            motorcycle enthusiasts who shared a passion for riding and a
            commitment to community service. The club started with just 10
            members who often rode together through the scenic routes of Oregon,
            seeking adventure and camaraderie.
          </h2>
          <h2 className="mt-4 text-center text-yellow-500">
            The SRMC is known for its annual charity rides and fundraisers.
            Every year, they host the "Ride for the Shadows," a charity ride
            that raises funds for local homeless shelters and food banks. They
            also participate in community clean-up events and provide support
            for veterans through various initiatives.
          </h2>
        </div>
            
        </div>
        <div className="sm:w-1/2 mt-4 sm:mt-0 bg-black p-8 h-full hidden sm:block">
          <h2 className="text-3xl font-bold text-center sm:text-left mt-4 text-white">Chapter</h2>
          <h2 className="mt-4 text-center text-yellow-500">
            The Shadow Riders Motorcycle Club was founded in 1984 by a group of
            motorcycle enthusiasts who shared a passion for riding and a
            commitment to community service. The club started with just 10
            members who often rode together through the scenic routes of Oregon,
            seeking adventure and camaraderie.
          </h2>
          <h2 className="mt-4 text-center text-yellow-500">
            The SRMC is known for its annual charity rides and fundraisers.
            Every year, they host the "Ride for the Shadows," a charity ride
            that raises funds for local homeless shelters and food banks. They
            also participate in community clean-up events and provide support
            for veterans through various initiatives.
          </h2>
        </div>

        {/*Mobile Navigation image will show and but hiden in bigger screen*/}
         <div className="sm:w-1/2 block sm:hidden">
          <Image 
            src="/soa3.jpg" 
            width={1000} height={500} 
            alt="soa"
            className="hidden sm:block"/>
        </div>
      </div>
    </>
  );
};

export default Hero;
