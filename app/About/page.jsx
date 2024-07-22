import React from "react";
import Image from "next/image";

const Aboutpage = () => {
  return (
    <>
      <div className="bg-black p-8">
        <div className="flex justify-center items-center mt-5">
          <h2 className="text-3xl text-yellow-400 font-bold border-b-4 border-double border-yellow-400">
            About Us
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row mt-10 px-4">
        <div className="w-full sm:w-1/2 flex flex-col  bg-black p-4 rounded-lg mb-10">
          <h2 className="text-xl font-bold mb-4 text-white ">Who are we?</h2>
          <p className="text-lg text-yellow-400">
            The MFC was begun with a broader vision and wanted to provide an
            organization that encouraged camaraderie between active and retired
            first responders, military veterans, and civilian patriots. At our
            core, the MFC Motorcycle Club is a fraternal organization. It is a
            brotherhood that respects and honors those who have served this
            great country both at home and abroad. In 2012, the MFC was
            officially chartered and recognized as a 501 (C) (3) organization.
            The MFC now has chapters throughout Florida, Georgia, Tennessee,
            West Virginia, and Connecticut, with increasing interest in other
            states as well. Since the beginning of the MFC, each new chapter has
            been required to adopt a local charitable organization that supports
            first responders or veterans. Each chapter then conducts fundraising
            events to support the adopted organization annually. Since 2012 the
            MFC MC has collectively raised over $250,000 in charitable donations
            to qualifying organizations. In addition to fundraising, the MFC
            participates in a number of events that support our veterans and
            first responders such as Wreaths Across America, Honor Flight, and
            memorials.
          </p>
        </div>

        <div className="w-full sm:w-1/2 ml-0 sm:ml-10 ">
          <Image
            src="/soa2.jpg"
            width={500}
            height={500}
            alt="A representation of our mission"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default Aboutpage;
