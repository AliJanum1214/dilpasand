"use client";
import { ArrowRight, MoveRight, MoveUpRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function MenuCard() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const restaurants = [
    {
      name: "Drinks",
      link: "/drinks",
      image:
        "https://restaurant-amici.com/wp-content/uploads/2024/04/AMICI-LESQUIN-1920x1280.jpg",
    },
    {
      name: "Fast Food",
      link: "/fast-food",
      image:
        "https://restaurant-amici.com/wp-content/uploads/2024/03/Coloft-480x360.jpg",
    },
    {
      name: "Desserts",
      link: "/desserts",
      image:
        "https://restaurant-amici.com/wp-content/uploads/2024/03/AMICI-6-480x320.jpg",
    },
  ];
  const topPositions = ["top-[200px]", "top-[250px]", "top-[300px]"];

  return (
    <div className="relative">
      {/* Hover Image Behind the Card */}
      {hoveredIndex !== null && (
        <div
          className={`absolute left-20 md:left-[55%] translate-x-1/2 z-0 rotate-[20deg] transform shadow-xl ${topPositions[hoveredIndex]}`}
        >
          {" "}
          <img
            src={restaurants[hoveredIndex].image}
            alt={restaurants[hoveredIndex].name}
            className="w-64 h-80 object-cover rounded border-2 custom-border"
          />
        </div>
      )}

      {/* Menu Card */}
      <div className="flex justify-center items-center h-screen">
        <div className=" max-w-lg bg-white border shadow-lg pt-6 px-6 h-[80vh] z-10 w-[350px] md:w-[400px]">
          <div className="border-2 custom-border p-1 h-[70vh] relative">
            <div className="border border-black p-6 h-[67.5vh]">
              <div className="flex justify-between items-center gap-4 mb-10">
                <h2 className="text-lg font-semibold text-black uppercase">
                  Dilpasand Menu
                </h2>
                <span
                  className="text-sm font-medium
              "
                >
                  03
                </span>
              </div>
              <ul>
                {restaurants.map((restaurant, index) => (
                  <li
                    key={index}
                    className="relative group border-b first:border-t border-black hover:bg-[#aa340d] hover:border-transparent transition-colors duration-300"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      href={restaurant.link}
                      className="block px-2 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between h-[60px]">
                        <span className="text-black group-hover:text-white font-medium text-xl z-10">
                          {restaurant.name}
                        </span>
                        <span className="text-black group-hover:text-white border-l border-black group-hover:border-transparent h-full flex items-center pl-4 z-10 transition-all duration-300">
                          {/* <img
                          src="./images/right_arrow.svg"
                          alt=""
                          className="w-6"
                        /> */}
                          <MoveRight className="transition-transform duration-300" />
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
