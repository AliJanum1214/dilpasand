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
    <div className="bg-custom-primary py-10 px-6  mx-auto relative h-screen">
      <h3 className="text-xl font-bold text-white uppercase mb-2 ">
        Subscribe to Dilpasand Newsletter
      </h3>
      <p className="text-sm w-full mb-6 text-white">
        Receive updates and forward offers.
      </p>

      <div className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-xs  font-medium text-white uppercase ">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-1.5 border border-gray-300  focus:outline-none text-white mt-1"
            placeholder="First Name"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-medium text-white uppercase mb-1 sm:mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-1.5 border border-gray-300  focus:outline-none text-white mt-1"
            placeholder="Email Address"
          />
        </div>

        {/* Postcode (Optional) */}
        <div>
          <label className="block text-xs font-medium text-white uppercase mb-1 sm:mb-2">
            Postcode (Optional)
          </label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
            className="w-full p-1.5 border border-gray-300  focus:outline-none text-white mt-1"
            placeholder="Postcode"
          />
        </div>

        {/* Select Your Local Cafe */}
        <div>
          <label className="block text-xs font-medium text-white uppercase mb-1 sm:mb-2">
            Select Your Local Cafe
          </label>
          <select
            name="cafe"
            value={formData.cafe}
            onChange={handleInputChange}
            className="w-full p-1.5 border border-gray-300  focus:outline-none text-white mt-1"
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
        </div>

        {/* Subscribe Button */}
        <button
          onClick={handleSubscribe}
          className="w-full bg-custom-secondary text-white p-2 rounded hover:bg-gray-800 transition-colors duration-300 text-base font-medium"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
