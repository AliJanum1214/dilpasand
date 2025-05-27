import React from "react";
import NewsletterForm from "./newsLetterForm";

export default function NewsLetterSection() {
  return (
    <div className="flex justify-between flex-wrap">
      <div className="md:w-[70%]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-[100vw] h-[100vh] max-w-none rounded-lg"
          src="https://res.cloudinary.com/dlorogzhe/video/upload/v1747915245/Restaurant_Ad_Video_Template__Editable_.mp4_1747914072760.mp4_1747914612518_erutzt.mp4"
        />
      </div>
      <div className="md:w-[30%]">
        <NewsletterForm />
      </div>
    </div>
  );
}
