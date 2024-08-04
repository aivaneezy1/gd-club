import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      {/*Pictures */}
      <div className="relative flex flex-col md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2">
          <Image
            src="https://gd-pictures.s3.eu-north-1.amazonaws.com/site-pictures/soa.jpg"
            width={1000}
            height={500}
            alt="soa"
            layout="responsive"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/soaBlack.jpg"
            width={1000}
            height={500}
            alt="soa"
            layout="responsive"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-center text-yellow-300 p-4">
          <h2 className="text-4xl font-bold mb-2 md:mb-4">
            A motorcycle club also known as
          </h2>
          <h2 className="text-4xl font-bold mb-2 md:mb-4">
            Golden Drakes
          </h2>
          <h2 className="text-4xl font-bold mb-2 md:mb-4">
            with its roots in Italy
          </h2>
        </div>
      </div>

      {/*Welcome Sign and chapter of the club */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 mx-4 md:mx-8 my-8">
        <div className="sm:w-1/2 bg-black p-4 lg:p-8 h-full border border-white rounded-lg shadow-lg">
          <span className="text-2xl md:text-3xl font-bold text-center text-white mb-4 block">
            Welcome
          </span>
          <p className="text-center text-yellow-300 mb-4">
            The Shadow Riders Motorcycle Club was founded in 1984 by a group of
            motorcycle enthusiasts who shared a passion for riding and a
            commitment to community service. The club started with just 10
            members who often rode together through the scenic routes of Oregon,
            seeking adventure and camaraderie.
          </p>
          <p className="text-center text-yellow-300">
            The SRMC is known for its annual charity rides and fundraisers.
            Every year, they host the Ride for the Shadows, a charity ride that
            raises funds for local homeless shelters and food banks. They also
            participate in community clean-up events and provide support for
            veterans through various initiatives.
          </p>
        </div>
        <div className="sm:w-1/2 w-full h-full">
          <Image
            src="https://gd-pictures.s3.eu-north-1.amazonaws.com/site-pictures/soa3.jpg"
            width={1000}
            height={500}
            alt="soa"
            layout="responsive"
            className="w-full h-full"
          />
        </div>
      </div>

      {/*Chapter of the club */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 mx-4 md:mx-8 my-8">
        <div className="hidden md:block sm:w-1/2 w-full h-full">
          <Image
            src="https://gd-pictures.s3.eu-north-1.amazonaws.com/site-pictures/soa3.jpg"
            width={1000}
            height={500}
            alt="soa"
            layout="responsive"
          />
        </div>
        <div className="sm:w-1/2 bg-black p-6 lg:p-8 h-full border border-white rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-4">
            Chapter
          </h2>
          <p className="text-center text-yellow-300 mb-4">
            The Shadow Riders Motorcycle Club was founded in 1984 by a group of
            motorcycle enthusiasts who shared a passion for riding and a
            commitment to community service. The club started with just 10
            members who often rode together through the scenic routes of Oregon,
            seeking adventure and camaraderie.
          </p>
          <p className="text-center text-yellow-300">
            The SRMC is known for its annual charity rides and fundraisers.
            Every year, they host the Ride for the Shadows, a charity ride that
            raises funds for local homeless shelters and food banks. They also
            participate in community clean-up events and provide support for
            veterans through various initiatives.
          </p>
        </div>
        <div className="block md:hidden sm:w-1/2 w-full h-full">
          <Image
            src="https://gd-pictures.s3.eu-north-1.amazonaws.com/site-pictures/soa3.jpg"
            width={1000}
            height={500}
            alt="soa"
            layout="responsive"
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
