import AboutUsSection from "@/components/aboutUs/aboutUsSection";
import VideoBanner from "@/components/banner/bannerVideo";
import BlogSection from "@/components/blogs/blogSection";
import ClientWrapper from "@/components/context/clientWrapper";
import Faq from "@/components/faq";
import FindUs from "@/components/findUs/findUs";
import GallerySection from "@/components/gallery/gallerySection";
import MapInfoSection from "@/components/map/mapInfoSection";
import MenuSection from "@/components/menu/menuSection";
import NewsLetterSection from "@/components/newsletter/newsLetterSection";
import TikTokSection from "@/components/tiktok/tiktokSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <VideoBanner />
      <FindUs />
      <AboutUsSection />
      <MenuSection />
      <MapInfoSection />
      <TikTokSection />
      <GallerySection />
      {/* <NewsLetterSection /> */}
      {/* <BlogSection /> */}
    </>
  );
}
