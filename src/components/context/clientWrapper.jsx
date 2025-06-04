"use client";
import { useEffect, useState } from "react";
import MenuBar from "../ui/menuBar";
import VideoBanner from "../banner/bannerVideo";

export default function ClientWrapper({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 1.4;
      setShowMenu(window.scrollY >= triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <VideoBanner />
      <div className="sections-container">
        {children}
        {showMenu && (
          <div className="fixed bottom-0 left-0 w-full z-50">
            <MenuBar />
          </div>
        )}
      </div>
    </>
  );
}
