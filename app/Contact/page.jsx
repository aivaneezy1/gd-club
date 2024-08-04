import React from "react";

const Contactpage = () => {
  return (
    <>
      <div className="bg-black p-8">
        <div className="flex justify-center items-center mt-5">
          <h2 className="text-6xl text-yellow-300 font-bold border-b-4 border-double border-yellow-400">
            Contact Us
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row mt-10 px-4 mb-2">
        <div className="w-full sm:w-1/2 flex flex-col   p-4 rounded-lg border border-white">
          <h2 className="text-xl font-semibold mb-4 text-white">Get in Touch</h2>
          <p className="text-lg mb-4 text-yellow-300">
            We would love to hear from you! Whether you have questions, comments, or just want to say hello, feel free to reach out to us using the contact details below.
          </p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Email:</h3>
            <p className="text-lg text-yellow-300">info@example.com</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Phone:</h3>
            <p className="text-lg text-yellow-300">(123) 456-7890</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Address:</h3>
            <p className="text-lg text-yellow-300">1234 Main St, Anytown, USA</p>
          </div>
        </div>

        <div className="w-full sm:w-1/2 ml-0 sm:ml-10 mt-5 sm:mt-0">
          {/* Google Maps Embed iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.0915113957312!2d10.395992126179744!3d43.70864727109963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d5919cee976919%3A0xe7e65ce35fbcf669!2sPisa%20Centrale!5e0!3m2!1sen!2sit!4v1721684624211!5m2!1sen!2sit"
            className="w-full h-80 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contactpage;
