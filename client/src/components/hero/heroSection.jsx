"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const bannerImageRef = useRef(null);
  const bannerRef = useRef(null);
  const bannerSectionRef = useRef(null);

  useEffect(() => {
    const bannerImage = bannerImageRef.current;
    const bannerContent = bannerRef.current;
    const section = bannerSectionRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=150%", // Extended to cover both animations
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Step 1: Scale banner image from smaller size to full screen
    tl.fromTo(
      bannerImage,
      { scale: 0.7, xPercent: 0, yPercent: 0 },
      {
        scale: 1,
        xPercent: 0,
        yPercent: 0,
        ease: "none",
        duration: 0.8,
      }
    );

    tl.fromTo(
      bannerContent,
      { y: "100vh", opacity: 0 },
      {
        y: 0, // Move to the top of the viewport
        opacity: 1, // Fade in as it moves
        ease: "none",
        duration: 0.1,
      },
      ">0.1" // Start slightly after the banner image scaling completes
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Banner Section */}
      <section
        ref={bannerSectionRef}
        className="relative flex items-center justify-center h-screen w-screen bg-custom-primary overflow-hidden"
      >
        <img
          ref={bannerImageRef}
          src="https://static.tildacdn.com/tild6663-6164-4566-b762-616133303038/max1232617_product_p.jpg"
          alt="Banner"
          className="object-cover w-[100vw] h-[100vh] max-w-none rounded-lg"
        />
        <div
          ref={bannerRef}
          className="text-white text-3xl md:text-5xl font-bold p-6 bg-black bg-opacity-50 w-full text-center absolute bottom-0"
        >
          Welcome to Dilpasand
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
