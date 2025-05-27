"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryCards({ onClose }) {
  const galleryRef = useRef(null);

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

  useEffect(() => {
    gsap.fromTo(
      galleryRef.current,
      { x: 300, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    const images = gsap.utils.toArray(".gallery-image");

    gsap.fromTo(
      images,
      { x: 1000 },
      {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div
      ref={galleryRef}
      className="relative flex gap-10 bg-custom-primary p-4 justify-center min-h-screen items-center overflow-hidden w-full"
    >
      {galleryImages.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={`Gallery ${index + 1}`}
          className="gallery-image w-72 h-[400px] object-cover shadow-md hover:scale-105 transition-transform duration-300 border-2 custom-border p-2 relative"
          style={{
            transform: `rotate(${img.rotate})`,
            top: img.top,
          }}
        />
      ))}
      <button
        onClick={onClose}
        className="absolute bottom-10 right-4 bg-white text-black px-3 py-1 rounded-lg shadow hover:bg-gray-200 transition"
      >
        Close
      </button>
    </div>
  );
}
