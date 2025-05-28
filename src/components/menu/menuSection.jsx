import React from "react";
import MenuCard from "./menuCard";

export default function MenuSection() {
  const menuItems = [
    {
      category: "Food",
      name: "Nihari",
      description: (
        <>
          A Karachi favorite is—4 tender slow-cooked stew that rich by bold
          flavours. Served alongside flaky layered paratha.
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
      image: "./images/drinks.png",
    },
  ];

  // Split items into left (Food) and right (Drinks, Desserts)
  const foodItems = menuItems.filter((item) => item.category === "Food");
  const rightItems = menuItems.filter(
    (item) => item.category === "Drinks" || item.category === "Desserts"
  );

  return (
    <div className="bg-custom-primary py-20">
      <h2 className="text-custom-secondary text-4xl text-center font-heading uppercase mb-12">
        Chef's Special
      </h2>
      <div className="max-w-6xl mx-auto px-4 sm:px-0">
        <div className="flex flex-col md:flex-row justify-center gap-3">
          {/* Left Side: Food Item */}
          <div className="flex-1">
            {foodItems.map((item, index) => (
              <div key={index} className="mb-6">
                <MenuCard
                  key={index}
                  category={item.category}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                />
                <button className="mt-4 ml-4 bg-custom-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition">
                  View Menu
                </button>
              </div>
            ))}
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block w-px bg-custom-secondary self-stretch my-4"></div>

          {/* Right Side: Drinks and Desserts */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
            {rightItems.map((item, index) => (
              <MenuCard
                key={index}
                category={item.category}
                name={item.name}
                image={item.image}
                description={item.description}
                isRightSide={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
