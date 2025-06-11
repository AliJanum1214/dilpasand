"use client";

import AboutUsSection from "@/components/aboutUs/aboutUsSection";
import VideoBanner from "@/components/banner/bannerVideo";
import FindUs from "@/components/findUs/findUs";
import MapInfoSection from "@/components/map/mapInfoSection";
import MenuSection from "@/components/menu/menuSection";
import TikTokSection from "@/components/tiktok/tiktokSection";
import { useState } from "react";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"> */}
      <div
        className=""
        style={{
          overflow: isModalOpen ? "hidden" : "",
          height: isModalOpen ? "90vh" : "",
        }}
      >
        <VideoBanner
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <FindUs />
        <AboutUsSection />
        <MenuSection />
        <MapInfoSection />
        <TikTokSection />
        {/* <GallerySection /> */}
        {/* </div> */}
        {/* <NewsLetterSection /> */}
        {/* <BlogSection /> */}
      </div>
    </>
  );
}
