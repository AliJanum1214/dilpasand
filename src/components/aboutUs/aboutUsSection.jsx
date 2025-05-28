"use client";
import { MoveRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "./about.style.css";
import MenuBar from "../ui/menuBar";

export default function AboutUsSection() {
  const [step, setStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const content = [
    {
      heading: "Our Story",
      title: "From Karachi to London",
      text: `In 2001, Asghar Khan arrived in London with a dream: to bring the rich culinary heritage of Karachi to a new audience. In the bustling streets of Karachi, Dilpasand began as a humble eatery in 1949, serving soulful dishes that blended the vibrant flavors of South Asia with the warmth of home. Founded by a family passionate about food and community, it quickly became a beloved gathering spot where stories were shared over plates of aromatic biryani and delicate sweets.`,
    },
    {
      heading: "Our Growth",
      title: "More Than Just a Restaurant",
      text: `From its modest beginnings, Dilpasand has grown into a cherished name, expanding its reach while staying true to its roots. In 2001, Asghar Khan brought the legacy to London, introducing authentic flavors to a global palate. Our growth reflects our commitment to quality and community, with each location becoming a hub for cultural exchange and culinary excellence.`,
    },
    {
      heading: "Today & Beyond",
      title: "Carrying the Flame Forward",
      text: `Today, Dilpasand continues to thrive, with locations in Karachi and London, preserving the traditions of 1949 while embracing innovation. We look forward to sharing our journey, connecting with new generations, and keeping the spirit of Dilpasand alive for years to come.`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 2;
      if (window.scrollY >= triggerPoint) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="bg-custom-primary text-white relative overflow-hidden md:px-0 px-4 py-20 flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 max-w-6xl mx-auto border custom-border p-8">
          {/* Left */}
          <div className="md:w-[40%] w-full flex items-center gap-4">
            <div className="flex flex-col items-center relative">
              {/* Labels for Steps */}
              <div className="relative h-80 flex flex-col justify-between items-center">
                {content.map((item, index) => (
                  <span
                    key={index}
                    className={`absolute text-base ${
                      step === index
                        ? "text-custom-secondary font-semibold"
                        : "text-white"
                    } ${
                      index === 0
                        ? "top-0"
                        : index === 1
                        ? "top-1/2 transform -translate-y-1/2"
                        : "bottom-0"
                    }`}
                  >
                    {item.heading}
                  </span>
                ))}
                <input
                  type="range"
                  min="0"
                  max={content.length - 1}
                  step="1"
                  value={step}
                  onChange={(e) => setStep(parseInt(e.target.value))}
                  className="h-80 w-2 cursor-pointer appearance-none bg-white rounded-full accent-custom-secondary ml-36"
                  style={{ writingMode: "vertical-lr" }}
                />
              </div>
            </div>
            <img
              src="./images/author.png"
              alt="Founder"
              className="w-40 h-80 object-cover"
            />
          </div>

          {/* Right */}
          <div className="md:w-[60%] w-full flex flex-col justify-center items-start gap-4 p-4">
            <h5 className="text-2xl font-[400] text-custom-secondary">
              {content[step].heading}
            </h5>
            <h3 className="text-yellow-500 text-4xl font-[500]">
              {content[step].title}
            </h3>
            <p className="text-white">{content[step].text}</p>
            <button className="relative group border-none text-custom-secondary outline-none cursor-pointer mt-2 p-1 capitalize flex gap-3 items-center">
              Read more about the story{" "}
              <span>
                <MoveRight />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-custom-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </div>
        </div>
      </div>

      {/* Show only if scrolled beyond 140vh */}
      {showMenu && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <MenuBar />
        </div>
      )}
    </>
  );
}
