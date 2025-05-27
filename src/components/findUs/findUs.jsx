import Image from "next/image";
import React from "react";
import MenuBar from "../ui/menuBar";

export default function FindUs() {
  return (
    <section className="bg-custom-primary relative justify-center items-center flex h-screen">
      <div className="">
        <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6 border custom-border">
          <div className="md:border-2 border-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 xl:gap-12">
            {/* Text Section */}
            <div className="md:w-[70%] text-white">
              <h2 className="text-yellow-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
                WELCOME TO DILPASAND
              </h2>
              <p className="text-sm md:text-base mb-4">
                Homemade recipes from Karachi enrich the soul in this welcoming
                dining room inspired by a Pakistani grandmother; “All-embracing
                timeless comfort.” Ornate tapestries and twinkling lights infuse
                the spirit of family feasts.
              </p>
              <p className="text-sm md:text-base">
                A 10-minute walk to Tower Bridge, Dilpasand is open every day,
                serving food from morning to night. All are welcome.
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-[30%] flex md:justify-start justify-center items-center">
              <div className="">
                <img
                  src="./images/find_us.png"
                  alt="Dilpasand restaurant interior"
                  className="w-full md:w-[250px]  h-[300px]  object-contain border shadow-2xl custom-border p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
