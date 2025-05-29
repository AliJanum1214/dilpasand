import AboutUsSection from "@/components/aboutUs/aboutUsSection";
import BannerVideo from "@/components/banner/bannerVideo";
import BlogSection from "@/components/blogs/blogSection";
import Faq from "@/components/faq";
import FindUs from "@/components/findUs/findUs";
import GallerySection from "@/components/gallery/gallerySection";
import MapInfoSection from "@/components/map/mapInfoSection";
import MenuSection from "@/components/menu/menuSection";
import NewsLetterSection from "@/components/newsletter/newsLetterSection";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <BannerVideo />
      <AboutUsSection />
      <FindUs />
      <MenuSection />
      <MapInfoSection />
      <GallerySection />
      <NewsLetterSection />
      <Footer />
      {/* <BlogSection /> */}
    </>
  );
}
