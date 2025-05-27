"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import NewsletterForm from "./newsLetterForm";

export default function NewsLetterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants for Framer Motion
  const formVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div ref={sectionRef} className="flex justify-between flex-wrap">
      <div className="md:w-[70%]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-[100vw] h-[100vh] max-w-none"
          src="https://res.cloudinary.com/dlorogzhe/video/upload/v1747915245/Restaurant_Ad_Video_Template__Editable_.mp4_1747914072760.mp4_1747914612518_erutzt.mp4"
        />
      </div>
      <div className="md:w-[30%]">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={formVariants}
        >
          <NewsletterForm />
        </motion.div>
      </div>
    </div>
  );
}
