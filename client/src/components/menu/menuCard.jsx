"use client";
import React from "react";

export default function MenuCard({
  category,
  name,
  description,
  image,
  borderImage,
  isFlipped,
  useCustomBorder,
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl ${
        useCustomBorder ? "pb-20 mb-2" : ""
      }`}
      style={{
        backgroundImage: `url(${borderImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transform: isFlipped ? "scaleX(-1)" : "none",
      }}
    >
      <div
        className="relative z-10 h-full p-6 flex flex-col justify-between"
        style={{
          transform: isFlipped ? "scaleX(-1)" : "none",
        }}
      >
        <div>
          <h4 className="text-lg font-semibold text-yellow-400 uppercase">
            {category}
          </h4>
          <h3 className="text-2xl font-heading uppercase text-custom-secondary mb-2">
            {name}
          </h3>
          <p className="text-base font-paragraph text-justify text-white leading-relaxed mb-2">
            {description}
          </p>
        </div>

        <div>
          <div className="relative w-full mb-4">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-56 rounded-md"
            />
          </div>
          <button className="w-full bg-custom-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
