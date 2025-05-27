"use client";
import React, { useRef, useState, useEffect } from "react";
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
  ];

  const duplicatedImages = [...galleryImages, ...galleryImages]; // for seamless looping
  const controls = useAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageWidth = 300; // image width + gap

  useEffect(() => {
    const interval = setInterval(() => {
      moveNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const moveNext = () => {
    const newIndex = currentIndex + 1;

    // If we've reached end of first set, reset immediately and continue
    if (newIndex >= galleryImages.length) {
      controls.set({ x: 0 }); // jump without animation
      setCurrentIndex(1); // move to second image
      controls.start({
        x: -imageWidth,
        transition: { type: "tween", duration: 0.6 },
      });
    } else {
      controls.start({
        x: -newIndex * imageWidth,
        transition: { type: "tween", duration: 0.6 },
      });
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="relative flex gap-10 bg-custom-primary p-4 min-h-screen items-center overflow-hidden w-full">
      <motion.div className="flex gap-10" animate={controls} initial={{ x: 0 }}>
        {duplicatedImages.map((img, index) => (
          <motion.img
            key={`${img.src}-${index}`}
            src={img.src}
            alt={`Gallery ${index + 1}`}
            className="gallery-image w-72 h-[400px] object-cover shadow-md border-2 custom-border p-2"
            style={{
              transform: `rotate(${img.rotate})`,
              top: img.top,
            }}
          />
        ))}
      </motion.div>

      <button
        onClick={onClose}
        className="absolute bottom-10 right-4 bg-white text-black px-3 py-1 rounded-lg shadow hover:bg-gray-200 transition z-10"
      >
        Close
      </button>
    </div>
  );
}
