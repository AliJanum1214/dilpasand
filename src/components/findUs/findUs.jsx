import Image from "next/image";
import React from "react";
import MenuBar from "../ui/menuBar";

export default function FindUs() {
  return (
    <section className="bg-custom-primary relative">
      <div className="py-6 md:py-16">
        <div className="max-w-[90%] sm:max-w-4xl md:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto p-2 sm:p-4 md:p-6 border custom-border">
          <div className="md:border-2 border-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 xl:gap-12">
            {/* Text Section */}
            <div className="md:w-[55%] text-white">
              <h2 className="text-yellow-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
                WELCOME TO <br /> DILPASAND
              </h2>
              <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-xl mb-4 sm:mb-6 md:mb-8">
                Homemade recipes from Karachi enrich the soul in this welcoming
                dining room inspired by a Pakistani grandmother; “All-embracing
                timeless comfort.” Ornate tapestries and twinkling lights infuse
                the spirit of family feasts.
              </p>
              <p className="text-sm sm:text-base md:text-lg xl:text-xl 2xl:text-xl">
                A 10-minute walk to Tower Bridge, Dilpasand is open every day,
                serving food from morning to night. All are welcome.
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-[45%] flex md:justify-start justify-center items-center">
              <div className="">
                <img
                  src="./images/find_us.png"
                  alt="Dilpasand restaurant interior"
                  className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] 2xl:max-w-[500px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] object-contain border shadow-2xl custom-border p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
