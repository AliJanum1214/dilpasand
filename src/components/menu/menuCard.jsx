import React from "react";

export default function MenuCard({
  category,
  name,
  description,
  image,
  index,
}) {
  const getBorderRadius = () => {
    if (index === 0) {
      return "rounded-tl-4xl rounded-bl-4xl";
    } else if (index === 2) {
      return "rounded-tr-4xl rounded-br-4xl";
    }
    return "";
  };

  return (
    <div
      className={`shadow-md md:p-4 p-0 border-2 custom-border ${getBorderRadius()} bg-custom-primary`}
    >
      <h4 className="text-lg font-semibold text-yellow-500 uppercase">
        {category}
      </h4>
      <h3 className="text-2xl font-heading uppercase text-custom-secondary mb-2">
        {name}
      </h3>
      <p className="text-base font-paragraph text-justify text-white leading-relaxed mb-2">
        {description}
      </p>
      <img src={image} alt={name} className={`w-full h-64 object-cover mb-4`} />
      <button className="my-4 ml-2 bg-custom-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition">
        View Menu
      </button>
    </div>
  );
}
