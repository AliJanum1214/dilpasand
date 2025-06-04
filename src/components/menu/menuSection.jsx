"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuItems } from "./menuCardsData";
import MenuTagline from "./menuTagLine";

const MenuCard = ({
  category,
  name,
  description,
  image,
  index,
  borderImage,
  isFlipped,
  useCustomBorder,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        useCustomBorder ? "border-2 custom-border p-3 mt-1 mb-0.5" : "p-6"
      }`}
      style={
        !useCustomBorder
          ? {
              backgroundImage: `url(${borderImage})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              transform: isFlipped ? "scaleX(-1)" : "none",
            }
          : {}
      }
    >
      <div
        className="relative z-10 py-3 h-full flex flex-col justify-between"
        style={{ transform: isFlipped ? "scaleX(-1)" : "none" }}
      >
        <div>
          {/* <h4 className="text-lg font-semibold text-yellow-500 uppercase">
            {category}
          </h4> */}
          <h3 className="text-lg text-center font-bold uppercase text-yellow-500 mb-2 whitespace-nowrap">
            {name.split("–").map((part, i, arr) => (
              <span key={i}>
                {part.trim()}
                {i < arr.length - 1 && (
                  <span className="text-custom-secondary mx-1">–</span>
                )}
              </span>
            ))}
          </h3>

          <p className="text-base text-justify text-white leading-relaxed mb-2">
            {description}
          </p>
        </div>
        <div>
          <div className="relative w-full mb-4">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-56 rounded-md"
            />
          </div>
          <button className="w-full bg-custom-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition">
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + itemsPerPage < menuItems.length) {
      setDirection(1);
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const visibleItems = menuItems.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <div
      id="menu"
      className="pb-20 bg-custom-primary relative flex justify-center items-center"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        <h2 className="text-custom-secondary text-3xl sm:text-4xl text-center font-bold uppercase mb-8 sm:mb-12">
          Chef's Special
        </h2>

        <div className="flex items-center gap-4 w-full">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-custom-secondary hover:text-yellow-400 transition disabled:opacity-30"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="relative w-full h-full min-h-[550px] flex-1 overflow-hidden">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 0.5,
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
              >
                {visibleItems.map((item, index) => {
                  const positionIndex = currentIndex + index + 1;
                  let borderImage = "";
                  let isFlipped = false;
                  let useCustomBorder = false;

                  if (positionIndex % 3 === 1) {
                    borderImage = "/images/card-border.png";
                  } else if (positionIndex % 3 === 2) {
                    useCustomBorder = true;
                    borderImage = "/images/second_card_border.png";
                  } else {
                    borderImage = "/images/card-border.png";
                    isFlipped = true; // For positions 3, 6, 9 (flip card-border image)
                  }

                  return (
                    <MenuCard
                      key={currentIndex + index}
                      {...item}
                      index={currentIndex + index}
                      borderImage={borderImage}
                      isFlipped={isFlipped}
                      useCustomBorder={useCustomBorder}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= menuItems.length}
            className="text-custom-secondary hover:text-yellow-400 transition disabled:opacity-30"
          >
            <ChevronRight size={36} />
          </button>
        </div>
        <div className="flex justify-center gap-2 mt-8 cursor-pointer">
          {Array.from({
            length: Math.ceil(menuItems.length / itemsPerPage),
          }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setDirection(i > currentIndex / itemsPerPage ? 1 : -1);
                setCurrentIndex(i * itemsPerPage);
              }}
              className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${
                currentIndex / itemsPerPage === i
                  ? "bg-custom-secondary scale-110"
                  : "bg-gray-400 hover:bg-custom-secondary"
              }`}
            />
          ))}
        </div>
        <MenuTagline />
      </div>
    </div>
  );
};

export default MenuSection;
