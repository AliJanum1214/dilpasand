"use client";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryCards({ onClose }) {
  const galleryImages = [
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/04/AMICI-15-480x600.jpg",
      rotate: "-5deg",
      top: "0px",
    },
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/04/AmiciLesquin_Satycation11-480x600.jpg",
      rotate: "2deg",
      top: "50px",
    },
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/03/371A7419-480x720.jpg",
      rotate: "-5deg",
      top: "-40px",
    },
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/03/SophiaCocktail.jpg",
      rotate: "2deg",
      top: "20px",
    },
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/04/AMICI-15-480x600.jpg",
      rotate: "-5deg",
      top: "0px",
    },
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/04/AmiciLesquin_Satycation11-480x600.jpg",
      rotate: "2deg",
      top: "50px",
    },
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/03/371A7419-480x720.jpg",
      rotate: "-5deg",
      top: "-40px",
    },
    {
      src: "https://restaurant-amici.com/wp-content/uploads/2024/03/SophiaCocktail.jpg",
      rotate: "2deg",
      top: "20px",
    },
  ];

  const duplicatedImages = [...galleryImages, ...galleryImages]; // for seamless looping
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageWidth = 300; // image width + gap

  const moveNext = () => {
    const newIndex = currentIndex + 1;
    if (newIndex >= duplicatedImages.length / 2) {
      controls.set({ x: 0 }); // Reset to start of duplicated set
      setCurrentIndex(0);
    } else {
      controls.start({
        x: -newIndex * imageWidth,
        transition: { type: "tween", duration: 0.6 },
      });
      setCurrentIndex(newIndex);
    }
  };

  const movePrev = () => {
    const newIndex = currentIndex - 1;
    if (newIndex < 0) {
      const lastIndex = duplicatedImages.length / 2 - 1;
      controls.set({ x: -lastIndex * imageWidth }); // Jump to end of first set
      setCurrentIndex(lastIndex);
    } else {
      controls.start({
        x: -newIndex * imageWidth,
        transition: { type: "tween", duration: 0.6 },
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="relative flex gap-10 bg-custom-secondary p-4 h-screen pb-20 items-center overflow-hidden w-full">
      {/* Left Arrow */}
      <button
        onClick={movePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 shadow hover:bg-gray-200 transition z-10"
      >
        <img src="./images/left_arrow.svg" alt="Previous" className="w-16" />
      </button>

      {/* Gallery Images */}
      <motion.div className="flex gap-10" animate={controls} initial={{ x: 0 }}>
        {duplicatedImages.map((img, index) => (
          <motion.img
            key={`${img.src}-${index}`}
            src={img.src}
            alt={`Gallery ${index + 1}`}
            className="gallery-image w-72 h-[350px] object-cover shadow-md border-2 border-white p-2"
            style={{
              transform: `rotate(${img.rotate})`,
              top: img.top,
            }}
          />
        ))}
      </motion.div>

      {/* Right Arrow */}
      <button
        onClick={moveNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 shadow hover:bg-gray-200 transition z-10"
      >
        <img src="./images/right_arrow.svg" alt="Next" className="w-16" />
      </button>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-8 py-1 rounded-lg shadow hover:bg-gray-200 transition z-10"
      >
        Close
      </button>
    </div>
  );
}
