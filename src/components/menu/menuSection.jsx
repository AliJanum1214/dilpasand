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
          A Karachi favorite—tender slow-cooked stew rich with bold flavours.
          Served alongside flaky layered paratha.
        </>
      ),
      image: "./images/drinks.png",
    },
    {
      category: "Desserts",
      name: "Mango Custard",
      description: (
        <>
          A Karachi favorite—tender slow-cooked stew rich with bold flavours.
          Served alongside flaky layered paratha.
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

      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <MenuCard
              key={index}
              index={index}
              category={item.category}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
