import Image from "next/image";
import React from "react";
import MenuBar from "../ui/menuBar";

export default function FindUs() {
  return (
    <section className="py-20 bg-custom-primary relative justify-center items-center flex md:px-0 px-4">
      <div className="">
        <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6 border custom-border">
          <div className="border-2 border-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-14 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 xl:gap-12">
            {/* Text Section */}
            <div className="md:w-[60%] text-white">
              <h2 className="text-yellow-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">
                WELCOME TO DILPASAND
              </h2>
              <p className="text-sm md:text-xl mb-4 tracking-normal word-spacing-tight leading-[33px] ">
                Dilpasand is bringing the soulful flavours of Karachi to the
                streets of London. The menu pays homage to the city’s iconic
                food spots, Burns Road, Tariq Road, Do Darya and most
                importantly, the Nani jaan’s of everyone back home, serving
                dishes that are rich in flavour and rooted in Pakistani
                tradition.
              </p>
              <p className="text-sm md:text-xl mb-4 tracking-normal word-spacing-tight leading-[33px] ">
                Experience authentic Karachi street food at Dilpasand, where
                every bite captures the vibrant essence of Pakistan’s culinary
                heritage, crafted with love and tradition in the heart of
                London.
              </p>
            </div>

            {/* Image Section */}
            <div className="md:w-[30%] flex md:justify-start justify-center items-center">
              <div className="">
                <img
                  src="./images/find_us.jpeg"
                  alt="Dilpasand restaurant interior"
                  className="w-full md:w-full  h-[400px]  object-cover border shadow-2xl custom-border p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
