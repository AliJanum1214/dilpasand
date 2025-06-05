"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tagline from "./tagLine";
import ReservationModal from "../modal/reservationModal";

gsap.registerPlugin(ScrollTrigger);

export default function VideoBanner() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      video,
      {
        scale: 0.7,
        xPercent: 0,
        yPercent: 0,
      },
      {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "none",
        duration: 0.8,
      }
    );

    tl.to(video, {
      duration: 0.1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="section relative flex items-center justify-center bg-custom-primary overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-[100vw] h-[100vh] max-w-none rounded-lg"
        src="https://res.cloudinary.com/dlorogzhe/video/upload/v1749136615/banner_xkgk79.mp4"
      />
      <div className="absolute inset-0 text-white flex items-center flex-col justify-center pointer-events-none">
        <h1 className="text-3xl md:text-6xl font-bold drop-shadow-lg">
          “Karachi Roots. London Tables ”
        </h1>
        <p className="py-3 max-w-sm text-center md:max-w-2xl">
          Experience the authentic taste of Karachi's Burns road in heart of
          London
        </p>
        <div className="bg-custom-primary rounded-lg">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-custom-secondary cursor-pointer px-4 py-2 z-50 rounded-md custom-hover-bg-opacity transition pointer-events-auto"
            style={{ height: "43px" }}
          >
            Book a Table
          </button>
        </div>
      </div>
      <div className="absolute bottom-3 w-full">
        <Tagline />
      </div>

      {/* Render modal if state is true */}
      {isModalOpen && (
        <ReservationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
