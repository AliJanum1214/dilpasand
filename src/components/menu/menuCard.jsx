import React from "react";

export default function MenuCard({
  category,
  name,
  description,
  image,
  isRightSide = false,
}) {
  return (
    <div className="rounded-lg shadow-md md:p-4 p-0">
      {isRightSide ? (
        <>
          <img
            src={image}
            alt={name}
            className="w-full h-80 object-cover mb-4 rounded-md"
          />
          <h4 className="text-lg font-semibold text-yellow-500 uppercase">
            {category}
          </h4>
          <h3 className="text-2xl font-heading uppercase text-custom-secondary mb-2">
            {name}
          </h3>
          <p className="text-base font-paragraph text-justify text-white leading-relaxed">
            {description}
          </p>
        </>
      ) : (
        <>
          <h4 className="text-lg font-semibold text-yellow-500 uppercase">
            {category}
          </h4>
          <h3 className="text-2xl font-heading uppercase text-custom-secondary mb-2">
            {name}
          </h3>
          <p className="text-base font-paragraph text-justify text-white leading-relaxed mb-2">
            {description}
          </p>
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover mb-4 rounded-md"
          />
        </>
      )}
    </div>
  );
}
