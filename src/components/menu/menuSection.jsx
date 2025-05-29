"use client";
import React from "react";
import MenuCard from "./menuCard";

export default function MenuSection() {
  const menuItems = [
    {
      category: "Food",
      name: "Nihari",
      description: (
        <>
          A Karachi favorite—tender slow-cooked stew rich with bold flavours.
          Served alongside flaky layered paratha.
        </>
      ),
      image: "./images/nihari.png",
    },
    {
      category: "Drinks",
      name: "Kashmiri Chai",
      description: (
        <>
          A traditional pink tea with creamy nutty richness, made from Kashmiri
          green tea, milk, cardamom, and served warm in winters.
        </>
      ),
      image: "./images/drinks.png",
    },
    {
      category: "Desserts",
      name: "Mango Custard",
      description: (
        <>
          A delightful dessert made with fresh mangoes, creamy custard, and a
          hint of cardamom. Perfect for summer.
        </>
      ),
      image:
        "https://img.freepik.com/premium-photo/plate-chocolate-cake-with-strawberry-strawberry_1122950-13065.jpg?ga=GA1.1.2028575557.1748437297&semt=ais_items_boosted&w=740",
    },
  ];

  return (
    <div className="bg-custom-primary pt-20 relative">
      <h2 className="text-custom-secondary text-4xl text-center font-heading uppercase mb-12">
        Chef's Special
      </h2>
      <img
        src="./images/heading_design.png"
        alt=""
        className="absolute top-10 left-1/2 opacity-30 transform -translate-x-1/2 w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-[40%_20%_40%]">
          {menuItems.map((item, index) => (
            <div key={index}>
              <MenuCard
                category={item.category}
                name={item.name}
                image={item.image}
                description={item.description}
                isRightSide={index === 1}
              />
              <button className="my-4 ml-2 bg-custom-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition">
                View Menu
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
