"use client";
import { MoveRight, MousePointer2, Hand, Grab, Pointer } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import "./about.style.css";
import MenuBar from "../ui/menuBar";
import Link from "next/link";

export default function AboutUsSection() {
  const [step, setStep] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const content = [
    {
      heading: "2002",
      title: "The Humble Beginning",
      text: "Asghar Khan arrived in London from Karachi, bringing with him a deep connection to the food culture he grew up with.",
      img: "./images/author.png",
    },
    {
      heading: "2010",
      title: "A Community Hub",
      text: `He began working in the food industry, gaining hands-on experience in busy London kitchens and learning what it takes to run a restaurant from the ground up.`,
      img: "./images/stories/story_2010.webp",
    },
    {
      heading: "2016",
      title: "Crossing Borders",
      text: `After years of hard work, he opened his first restaurant on Southall Broadway, focused on serving traditional Pakistani dishes to the local community.`,
      img: "./images/stories/story_2016.webp",
    },
    {
      heading: "2019",
      title: "Growth and Recognition",
      text: `Asghar launched Dilpasand in Whitechapel, with a clear goal: to bring bold, authentic Pakistani flavours to central London. Today, Dilpasand is a reflection of his journey—rooted in Karachi, built in London.`,
      img: "./images/stories/story_2019.webp",
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
    <div
      id="story"
      className="bg-custom-primary pb-20 text-white relative overflow-hidden md:px-0 px-4 flex justify-center items-center"
    >
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
            </div>
          </div>
          <img
            src={content[step].img}
            alt={content[step].title}
            className="w-72 h-[400px] object-cover  shadow-lg ml-16 p-4 border border-white"
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
          <Link href={"/our-story"}>
            <button className="relative group border-none text-custom-secondary outline-none cursor-pointer mt-2 p-1 capitalize flex gap-3 items-center">
              Read more about the story{" "}
              <span>
                <MoveRight />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-custom-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>
          </Link>
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
