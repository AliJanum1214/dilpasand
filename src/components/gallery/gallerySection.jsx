"use client";
import React, { useState } from "react";
import GalleryCards from "./galleryCards";

export default function GallerySection() {
  const [showGallery, setShowGallery] = useState(false);

  const handleClick = () => {
    setShowGallery(true);
    setTimeout(() => {
      const galleryEl = document.getElementById("gallery-cards");
      galleryEl?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleClose = () => {
    setShowGallery(false);
  };

  return (
    <div className="relative gallery_section bg-cover bg-center bg-no-repeat h-[100vh] w-full z-0">
      {!showGallery && (
        <div className="bg-white p-4 absolute bottom-4 left-3 max-w-xs rounded-2xl">
          It's 1949, and the thrill of the Talkies era is in full swing. While
          cine stars chatter self-importantly, the wealthy hobnob with the
          beautiful, the rakish and the occasional ne'er-do-wells. Stop – admire
          our walls. The myriad of artefacts, photographs, portraits,
          collectables. In their stillness they depict the vivacity, life and
          glamour of 1930s and 40s Bombay.
          <button
            onClick={handleClick}
            className="relative group border-none text-custom-secondary outline-none cursor-pointer mt-2 p-1"
          >
            View Gallery
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
        </div>
      )}

      {showGallery && (
        <div id="gallery-cards">
          <GalleryCards onClose={handleClose} />
        </div>
      )}
    </div>
  );
}
