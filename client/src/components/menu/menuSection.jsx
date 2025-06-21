"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { menuItems } from "./menuCardsData";
import ExploreMenu from "./exploreMenu";

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
      className={`relative w-full overflow-hidden h-[360px] md:h-[410px]   ${
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
        className="relative py-3 h-full flex flex-col space-y-4"
        style={{ transform: isFlipped ? "scaleX(-1)" : "none" }}
      >
        <div>
          <h3 className="text-base sm:text-lg md:text-xl text-center font-bold uppercase text-yellow-500 mb-2 whitespace-nowrap">
            {name.split("–").map((part, i, arr) => (
              <span key={i}>
                {part.trim()}
                {i < arr.length - 1 && (
                  <span className="text-custom-secondary mx-1">–</span>
                )}
              </span>
            ))}
          </h3>
          <p className="text-sm sm:text-base text-white leading-relaxed h-[100px] overflow-hidden">
            {description}
          </p>
        </div>
        <div className="w-full">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-40 sm:h-44 md:h-48 rounded-md"
          />
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
      className="pb-20 bg-custom-primary relative flex justify-center items-center px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        <h2 className="text-custom-secondary text-2xl sm:text-3xl md:text-4xl text-center font-bold uppercase mb-6 sm:mb-10">
          Chef's Special
        </h2>

        <div className="flex items-center gap-2 sm:gap-4 w-full">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-custom-secondary hover:text-yellow-400 transition disabled:opacity-30"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="relative w-full min-h-[480px] flex-1 overflow-hidden">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full pb-20"
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
                    isFlipped = true;
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

            {/* Fixed ExploreMenu */}
            <div className="absolute bottom-0 left-0 w-full z-10">
              <ExploreMenu />
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= menuItems.length}
            className="text-custom-secondary hover:text-yellow-400 transition disabled:opacity-30"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8 cursor-pointer">
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
      </div>
    </div>
  );
};

export default MenuSection;
