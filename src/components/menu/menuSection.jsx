import React from "react";
import MenuCard from "./menuCard";

export default function MenuSection() {
  return (
    <div
      className="relative bg-[url('https://restaurant-amici.com/wp-content/uploads/2024/03/SophiaCocktail.jpg')] bg-cover bg-center bg-no-repeat h-screen w-full"
      id="menu"
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <MenuCard />
    </div>
  );
}
