"use client";
import { MoveRight, MousePointer2, Hand, Grab, Pointer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "./about.style.css";
import MenuBar from "../ui/menuBar";

export default function AboutUsSection() {
  const [step, setStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const content = [
    {
      heading: "1965",
      title: "The Humble Beginning",
      text: `In 1965, Dilpasand was born in the heart of Karachi as a small family-run eatery. With a passion for authentic South Asian flavors, the founders created a space where locals gathered to enjoy aromatic biryanis and handcrafted sweets, laying the foundation for a culinary legacy.`,
    },
    {
      heading: "1979",
      title: "A Community Hub",
      text: `By 1979, Dilpasand had become a beloved gathering spot in Karachi. Known for its warm hospitality and soulful dishes, it fostered a sense of community, where stories were shared over plates of flavorful curries and traditional desserts.`,
    },
    {
      heading: "2001",
      title: "Crossing Borders",
      text: `In 2001, Asghar Khan brought Dilpasand's rich culinary heritage to London. This expansion introduced Karachi’s vibrant flavors to a global audience, blending tradition with a new cultural landscape while maintaining the essence of home.`,
    },
    {
      heading: "2007",
      title: "Growth and Recognition",
      text: `By 2007, Dilpasand had solidified its reputation as a culinary gem in both Karachi and London. With a commitment to quality and authenticity, it earned acclaim for its innovative takes on classic dishes, becoming a symbol of cultural pride.`,
    },
    {
      heading: "2025",
      title: "A Global Legacy",
      text: `Today, in 2025, Dilpasand thrives as a bridge between tradition and innovation. With locations in Karachi and London, we continue to share our heritage with new generations, keeping the spirit of Dilpasand alive for the future.`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 1.4;
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
    <div className="bg-custom-primary text-white relative overflow-hidden md:px-0 px-4 py-20 flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 max-w-6xl mx-auto border custom-border p-8">
        {/* Left */}
        <div className="md:w-[40%] w-full flex items-center gap-4 ml-16">
          <div className="flex flex-col items-center relative">
            {/* Timeline Container */}
            <div className="relative h-96 flex flex-col justify-between items-center">
              {content.map((item, index) => (
                <div
                  key={index}
                  className={`absolute flex items-center text-base transition-all duration-300 cursor-pointer ${
                    step === index
                      ? "text-custom-secondary font-semibold"
                      : "text-white opacity-70 hover:opacity-100"
                  } ${index % 2 === 0 ? "left-0 pr-4" : "right-0 pl-4"}`}
                  style={{
                    top: `${(index / (content.length - 1)) * 100}%`,
                    transform:
                      index % 2 === 0
                        ? "translate(-100%, -50%)"
                        : "translate(100%, -50%)",
                  }}
                  onClick={() => setStep(index)}
                >
                  {step === index && (
                    <span
                      className={`text-custom-secondary text-2xl ${
                        step === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      ►
                    </span>
                  )}
                  <span className="relative z-10">{item.heading}</span>
                </div>
              ))}
              <input
                type="range"
                min="0"
                max={content.length - 1}
                step="1"
                value={step}
                onChange={(e) => setStep(parseInt(e.target.value))}
                className="h-96 w-[30px] cursor-pointer appearance-none bg-transparent rounded-full accent-custom-secondary relative z-10"
                style={{ writingMode: "vertical-lr" }}
              />
              <div className="absolute h-full w-2 bg-white rounded-full" />
              {/* {step === 0 && (
                <span
                  className="absolute top-0 right-0 translate-x-full text-yellow-500 text-2xl  cursor-pointer-icon animate-pulse"
                  style={{ transform: "translate(100%, -50%)" }}
                >
                  <Pointer />
                </span>
              )} */}
            </div>
          </div>
          <img
            src="./images/author.png"
            alt="Founder"
            className="w-40 h-80 object-cover rounded-lg shadow-lg ml-16"
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
          <p className="text-white leading-relaxed">{content[step].text}</p>
          <button className="relative group border-none text-custom-secondary outline-none cursor-pointer mt-2 p-1 capitalize flex gap-3 items-center">
            Read more about the story{" "}
            <span>
              <MoveRight />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-custom-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      </div>

      {/* Show only if scrolled beyond 140vh */}
      {showMenu && (
        <div className="fixed bottom-0 left-0 w-full z-50">
          <MenuBar />
        </div>
      )}
    </div>
  );
}
