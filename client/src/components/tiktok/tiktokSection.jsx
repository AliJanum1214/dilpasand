"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TIKTOK_EMBED_SCRIPT_SRC = "https://www.tiktok.com/embed.js";

const tiktokVideos = [
  {
    id: "7459853944769088801",
    title: "Karachi Silver Spoon and hot n spicy paratha roll now in London!",
  },
  { id: "7440560351898373408", title: "Karachi gola kebab with lacha paratha" },
  { id: "7444219634976443680", title: "Authentic Karachi biryani in London" },
  {
    id: "7509988209032531222",
    title: "Pakistani Raan Roast platter in London for Eid",
  },
  {
    id: "7497665418153168150",
    title: "The famous Karachi Koila Karahi now in London",
  },
  {
    id: "7492499679704304918",
    title: "Burns Road Karachi's legendary Waheed Kebab Fry now in London!",
  },
  {
    id: "7489184668932214039",
    title: "PAKISTANI TAWA TAKA TAK NOW IN LONDON!",
  },
  {
    id: "7487250103493774614",
    title: "Spending Eid in London away from your loved ones in Pakistan?",
  },
  {
    id: "7482879992188177686",
    title: "Pakistani street style tawa maghaz masala in London",
  },
];

const TikTokCard = ({ videoId, title }) => (
  <motion.div
    className="bg-custom-primary border-2 custom-border rounded-xl p-3"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/@dilpasand_london/video/${videoId}`}
      data-video-id={videoId}
      style={{ borderRadius: "20px", width: "100%", height: "500px" }}
    >
      <section>
        <a
          target="_blank"
          title="@dilpasand_london"
          href="https://www.tiktok.com/@dilpasand_london?refer=embed"
          rel="noreferrer"
        >
          @dilpasand_london
        </a>{" "}
        {title}
      </section>
    </blockquote>
  </motion.div>
);

export default function TikTokSection() {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;

  const loadTikTokScript = () => {
    if (scriptLoadedRef.current) return;

    const existingScript = document.querySelector(
      `script[src="${TIKTOK_EMBED_SCRIPT_SRC}"]`
    );
    if (existingScript) {
      scriptLoadedRef.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = TIKTOK_EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadTikTokScript();

    // Function to parse TikTok embeds
    const parseTikTok = () => {
      if (window.tiktok?.parse && containerRef.current) {
        window.tiktok.parse(containerRef.current);
      }
    };

    // Initial parse after script load
    parseTikTok();

    // Set up a MutationObserver to detect changes in the container
    const observer = new MutationObserver(() => {
      parseTikTok();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Retry parsing a few times to handle async script loading
    const retries = 5;
    let attempts = 0;
    const interval = setInterval(() => {
      parseTikTok();
      attempts++;
      if (attempts >= retries) {
        clearInterval(interval);
      }
    }, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [currentIndex]);

  const visibleItems = tiktokVideos.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: { x: 0, opacity: 1, position: "relative" },
    exit: (dir) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < tiktokVideos.length) {
      setDirection(1);
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  return (
    <div className="p-4 bg-custom-primary py-20" ref={containerRef}>
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        <div className="flex gap-2 items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-yellow-500">
            Follow us On
          </h2>
          <img
            src="/images/TikTok_logo.png"
            alt="TikTok Logo"
            className="w-[140px] h-auto"
          />
        </div>

        <div className="flex items-center w-full gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-yellow-500 hover:text-white transition disabled:opacity-30"
          >
            <ChevronLeft size={36} />
          </button>

          <div className="relative w-full min-h-[550px] overflow-hidden">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {visibleItems.map((video) => (
                  <TikTokCard
                    key={video.id}
                    videoId={video.id}
                    title={video.title}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= tiktokVideos.length}
            className="text-yellow-500 hover:text-white transition disabled:opacity-30"
          >
            <ChevronRight size={36} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6 cursor-pointer">
          {Array.from({
            length: Math.ceil(tiktokVideos.length / itemsPerPage),
          }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setDirection(i > currentIndex / itemsPerPage ? 1 : -1);
                setCurrentIndex(i * itemsPerPage);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex / itemsPerPage === i
                  ? "bg-yellow-500 scale-110"
                  : "bg-gray-400 hover:bg-yellow-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
