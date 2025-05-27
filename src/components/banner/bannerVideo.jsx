"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tagline from "./tagLine";

gsap.registerPlugin(ScrollTrigger);

export default function VideoBanner() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

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
    // Pause at full size for a moment
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
      className="relative flex items-center justify-center h-screen w-screen bg-custom-primary overflow-hidden"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-[100vw] h-[100vh] max-w-none rounded-lg"
        src="https://res.cloudinary.com/dlorogzhe/video/upload/v1747915245/Restaurant_Ad_Video_Template__Editable_.mp4_1747914072760.mp4_1747914612518_erutzt.mp4"
      />
      <div className="absolute inset-0 text-white flex items-center flex-col justify-center pointer-events-none">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
          “ From Karachi With Love ”
        </h1>
        <p className="py-3">
          Experience the authentic taste of Karachi's Burns road in heart of
          London
        </p>
        <button className="bg-custom-secondary px-4 py-1.5 rounded-lg text-base">
          Book a table
        </button>
      </div>
      <div className="absolute bottom-3 w-full">
        <Tagline />
      </div>
    </div>
  );
}
