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
      text: `In 2001, Asghar Khan arrived in London with a dream: to bring In the bustling streets of Karachi, Dilpasand began as a humble eatery in 1949, serving soulful dishes that blended the vibrant flavors of South Asia with the warmth of home. Founded by a family passionate about food and community, it quickly became a beloved gathering spot where stories were shared over plates of aromatic biryani and delicate sweets.Decades later, this legacy crossed oceans to London, where Dilpasand Restaurant now stands as a beacon of heritage and hospitality. Here, we continue to honor our roots, offering a menu that tells the story of Karachi’s bustling markets and London’s cosmopolitan charm, inviting guests to savor a taste of history with every bite.`,
    },
    {
      heading: "Our Growth",
      title: "More Than Just a Restaurant",
      text: `In 2001, Asghar Khan arrived in London with a dream: to bring In the bustling streets of Karachi, Dilpasand began as a humble eatery in 1949, serving soulful dishes that blended the vibrant flavors of South Asia with the warmth of home. Founded by a family passionate about food and community, it quickly became a beloved gathering spot where stories were shared over plates of aromatic biryani and delicate sweets. Decades later, this legacy crossed oceans to London, where Dilpasand Restaurant now stands as a beacon of heritage and hospitality. Here, we continue to honor our roots, offering a menu that tells the story of Karachi’s bustling markets and London’s cosmopolitan charm, inviting guests to savor a taste of history with every bite.`,
    },
    {
      heading: "Today & Beyond",
      title: "Carrying the Flame Forward",
      text: `In 2001, Asghar Khan arrived in London with a dream: to bring In the bustling streets of Karachi, Dilpasand began as a humble eatery in 1949, serving soulful dishes that blended the vibrant flavors of South Asia with the warmth of home. Founded by a family passionate about food and community, it quickly became a beloved gathering spot where stories were shared over plates of aromatic biryani and delicate sweets. Decades later, this legacy crossed oceans to London, where Dilpasand Restaurant now stands as a beacon of heritage and hospitality. Here, we continue to honor our roots, offering a menu that tells the story of Karachi’s bustling markets and London’s cosmopolitan charm, inviting guests to savor a taste of history with every bite.`,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % content.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="bg-custom-primary text-white relative overflow-hidden md:px-0 px-6 h-screen flex justify-center items-center">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 max-w-6xl mx-auto border custom-border p-8">
          {/* Left */}
          <div className="md:w-[30%] w-full flex items-center gap-4">
            <div className="flex flex-col items-center">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={step}
                onChange={(e) => setStep(parseInt(e.target.value))}
                className="h-80 w-2 cursor-pointer appearance-none bg-white rounded-full accent-custom-secondary"
                style={{ writingMode: "vertical-lr" }}
              />
            </div>
            <img
              src="./images/author.png"
              alt="Founder"
              className="w-40 h-80 object-cover"
            />
          </div>

          {/* Right */}
          <div className="md:w-[70%] w-full flex flex-col justify-center items-start gap-4 p-4">
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
