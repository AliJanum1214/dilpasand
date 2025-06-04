"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

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

const TikTokCard = ({ videoId, title, isFlipped }) => (
  <motion.div
    className="relative bg-custom-primary w-full overflow-hidden rounded-xl p-4 mt-3 mb-1 border-2 custom-border"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div style={{ transform: isFlipped ? "scaleX(-1)" : "none" }}>
      <blockquote
        className="tiktok-embed"
        cite={`https://www.tiktok.com/@dilpasand_london/video/${videoId}`}
        data-video-id={videoId}
        style={{
          borderRadius: "20px",
          width: "300px",
          height: "500px",
          margin: "6px auto",
        }}
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
    </div>
  </motion.div>
);

export default function TikTokSection() {
  const containerRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  const parseTikTokEmbeds = () => {
    if (window.tiktok?.parse && containerRef.current) {
      window.tiktok.parse(containerRef.current);
    }
  };

  const loadTikTokScript = () => {
    if (scriptLoadedRef.current) {
      parseTikTokEmbeds();
      return;
    }

    const existingScript = document.querySelector(
      `script[src="${TIKTOK_EMBED_SCRIPT_SRC}"]`
    );
    if (existingScript) {
      scriptLoadedRef.current = true;
      parseTikTokEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.src = TIKTOK_EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
      parseTikTokEmbeds();
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Attempt to parse immediately in case script is cached
    parseTikTokEmbeds();
    loadTikTokScript();

    // Set up MutationObserver for dynamic updates
    const observer = new MutationObserver(() => {
      parseTikTokEmbeds();
      // Fallback retry after a short delay
      setTimeout(parseTikTokEmbeds, 100);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-4 bg-custom-primary py-20" ref={containerRef}>
      <div></div>
      <div className="max-w-6xl mx-auto flex flex-col items-center w-full">
        <h2 className="text-3xl sm:text-4xl text-center font-bold uppercase mb-2 text-yellow-500">
          Follow us On
        </h2>
        <div className="flex justify-center items-center">
          <img
            src="/images/TikTok_logo.png"
            alt="TikTok Logo"
            className="w-[200px] h-auto"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto">
          {tiktokVideos.map((video, index) => (
            <TikTokCard key={video.id} videoId={video.id} title={video.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
