"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthday: "",
    cafe: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle API call here
  };

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  return (
    <div className="grid md:grid-cols-[70%_30%] min-h-screen bg-custom-primary">
      {/* Left: Background Image with overlay text */}
      <div
        className="relative bg-cover bg-center min-h-screen w-full flex justify-center items-center"
        style={{ backgroundImage: 'url("/images/newsletter.jpg")' }}
      >
        <div className="absolute inset-0 flex min-h-screen items-center bg-black/30 justify-center"></div>
        <h1 className="text-custom-secondary text-4xl md:text-6xl font-serif text-center drop-shadow-md z-10">
          “From Karachi with Love”
        </h1>
      </div>

      {/* Right: Newsletter Form with Animation */}
      <motion.div
        ref={formRef}
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-custom-primary text-white p-4 md:p-8 flex items-center"
      >
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
          <h2 className="text-sm text-yellow-500 tracking-widest font-semibold">
            NEWSLETTER
          </h2>
          <h1 className="text-2xl font-serif text-custom-secondary font-medium leading-snug tracking-widest uppercase">
            Subscribe to the Dishoom Newsletter
          </h1>
          <p
            className="text-white"
            style={{ fontSize: "11px", lineHeight: "1.5" }}
          >
            First-dibs on new launches, occasional recipes and other Dishoom
            goings-on — straight to your inbox.
          </p>

          {/* Input Fields */}
          <div>
            <label className="block text-xs font-semibold uppercase mb-1">
              First Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Kindly enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Kindly enter your email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-secondary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1">
              Birthday (Optional)
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md bg-custom-primary text-white shadow-2xl focus:outline-none focus:ring-2 focus:ring-custom-secondary"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
                colorScheme: "dark",
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase mb-1">
              Select your local café
            </label>
            <select
              name="cafe"
              value={formData.cafe}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md bg-custom-primary text-white focus:outline-none focus:ring-2 focus:ring-custom-secondary"
            >
              <option value="">Select</option>
              <option value="kings-cross">King's Cross</option>
              <option value="covent-garden">Covent Garden</option>
              <option value="shoreditch">Shoreditch</option>
            </select>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1"
            />
            <label style={{ fontSize: "11px", lineHeight: "1.5" }}>
              I consent to receive occasional emails with news about products,
              restaurants and suchlike, in accordance with Dishoom’s{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            className="bg-custom-secondary rounded-lg text-white px-6 py-2 uppercase tracking-wider hover:bg-gray-800 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </div>
  );
}
