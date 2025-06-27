"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TikTokEmbed } from "react-social-media-embed";

const tiktokVideos = [
  { id: "7459853944769088801", title: "Silver Spoon Roll in London" },
  { id: "7440560351898373408", title: "Gola Kebab with Lacha Paratha" },
  { id: "7444219634976443680", title: "Karachi Biryani in London" },
  { id: "7441659993289395488", title: "Lahori Yakhni Pulao in London" },
  { id: "7497665418153168150", title: "Koila Karahi in London" },
  { id: "7492499679704304918", title: "Waheed Kebab Fry" },
  { id: "7489184668932214039", title: "Tawa Taka Tak" },
  { id: "7487250103493774614", title: "Eid in London" },
  { id: "7482879992188177686", title: "Tawa Maghaz Masala" },
];

const TikTokCard = ({ videoId, title }) => {
  const videoUrl = `https://www.tiktok.com/@dilpasand_london/video/${videoId}`;

  return (
    <div className="bg-custom-primary border-2 custom-border rounded-xl py-3  h-full">
      <TikTokEmbed
        url={videoUrl}
        width={300}
        height={570}
        className="mx-auto"
      />
    </div>
  );
};

export default function TikTokSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsPerPage = 3;

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

  const visibleVideos = tiktokVideos.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const totalBatches = Math.ceil(tiktokVideos.length / itemsPerPage);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <div className="p-4 bg-custom-primary py-20">
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

          <div className="relative w-full min-h-[550px]">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={`batch-${currentIndex}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {visibleVideos.map((video) => (
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

        <div className="flex justify-center gap-2 mt-6 cursor-pointer">
          {Array.from({ length: totalBatches }).map((_, i) => {
            const batchStart = i * itemsPerPage;
            return (
              <div
                key={i}
                onClick={() => {
                  setDirection(batchStart > currentIndex ? 1 : -1);
                  setCurrentIndex(batchStart);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === batchStart
                    ? "bg-yellow-500 scale-110"
                    : "bg-gray-400 hover:bg-yellow-500"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
