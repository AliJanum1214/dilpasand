"use client";
import React, { useState } from "react";

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    postcode: "",
    cafe: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubscribe = () => {
    console.log("Subscribing with data:", formData);
    setFormData({ firstName: "", email: "", postcode: "", cafe: "" });
  };

  return (
    <div className="bg-custom-primary relative h-screen  flex items-center justify-center">
      <div className="max-w-[90%] mx-auto">
        <h3 className="text-xl font-bold text-white uppercase mb-8">
          Subscribe to Dilpasand Newsletter
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl text-white mb-6">
          Receive updates and forward offers.
        </p>

        <div className="space-y-5 sm:space-y-6 md:space-y-7">
          {/* First Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="firstName"
              id="floating_first_name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-secondary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-custom-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First Name
            </label>
          </div>

          {/* Email Address */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              value={formData.email}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-secondary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-custom-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
          </div>

          {/* Postcode (Optional) */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="postcode"
              id="floating_postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-secondary peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_postcode"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-custom-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Postcode (Optional)
            </label>
          </div>

          {/* Select Your Local Cafe */}
          <div className="relative z-0 w-full mb-5 group">
            <select
              name="cafe"
              id="floating_cafe"
              value={formData.cafe}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-custom-secondary peer"
            >
              <option value="" className="text-black">
                Select a cafe
              </option>
              <option value="dilpasand-london" className="text-black">
                Dilpasand London
              </option>
              <option value="dilpasand-karachi" className="text-black">
                Dilpasand Karachi
              </option>
            </select>
            <label
              htmlFor="floating_cafe"
              className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-custom-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Select Your Local Cafe
            </label>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            className="w-full bg-custom-secondary text-white py-2.5 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-custom-secondary font-medium text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl transition-colors duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
