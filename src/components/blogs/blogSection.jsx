"use client";

import { useState, useEffect, useRef } from "react";

export default function BlogSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollableRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
        const maxScroll = scrollHeight - clientHeight;
        const scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setScrollPosition(scrollFraction);
      }
    };

    const scrollableElement = scrollableRef.current;
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }

    const handleWheel = (e) => {
      const isMouseInContainer = containerRef.current?.contains(e.target);
      const isOverScrollable = e.target.closest(".scrollable-section");
      const isOverLeftSection = e.target.closest(".left-section");

      if (!isMouseInContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const atTop = scrollTop <= 1;

      if (e.deltaY > 0 && !isOverScrollable && !atBottom) {
        e.preventDefault();
        scrollableRef.current.scrollTop += e.deltaY;
      } else if (e.deltaY < 0 && isOverLeftSection && scrollTop > 0) {
        e.preventDefault();
        scrollableRef.current.scrollTop += e.deltaY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const blogs = [
    {
      category: "Story",
      title: "The Dishoom Covent Garden Story",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ad, ipsam quisquam illo deserunt esse ab quidem.",
      image: "images/00.png",
    },
    {
      category: "Story",
      title: "Celebrating Women in Story",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ad, ipsam quisquam illo deserunt esse ab quidem.",
      image: "images/01.png",
    },
    {
      category: "Story",
      title: "Founding Myth Part 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ad, ipsam quisquam illo deserunt esse ab quidem.",
      image: "images/02.png",
    },
    {
      category: "Story",
      title: "Covent Garden Updates",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ad, ipsam quisquam illo deserunt esse ab quidem.",
      image: "images/002.png",
    },
    {
      category: "Story",
      title: "Cultural Heritage",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ad, ipsam quisquam illo deserunt esse ab quidem.",
      image: "images/01.png",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative flex lg:h-screen flex-col md:flex-row bg-custom-primary text-white"
    >
      {/* Vertical Scrollbar Line */}
      <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 h-[80vh] w-[2px] bg-gray-600 z-10">
        <div
          className="w-[2px] bg-custom-secondary transition-all duration-100 ease-out"
          style={{
            height: "100%",
            transformOrigin: "top",
            transform: `scaleY(${scrollPosition})`,
          }}
        ></div>
      </div>

      {/* Left Fixed Section */}
      <div className="left-section md:w-1/2 p-8 flex flex-col justify-center gap-4">
        <h1 className="text-xl font-bold tracking-wide">THE STORY CONTINUES</h1>
        <h2 className="text-2xl font-semibold">
          Browse latest stories from Dishoom Covent Garden
        </h2>
        <div className="mt-4">
          <img
            src="images/01.png"
            alt="Recent Blog"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Story</h3>
          <h3 className="text-lg font-semibold hover:underline">
            Cultural Heritage
          </h3>
          <h3 className="text-lg font-semibold hover:underline">
            By Joe Winter
          </h3>
        </div>
      </div>
      <div
        ref={scrollableRef}
        className="md:w-1/2 lg:h-[80vh] lg:mt-20 md:pl-8 mr-4 md:mr-0 overflow-y-auto text-white"
      >
        <div className="flex md:flex-col flex-row gap-4 lg:gap-6 px-4 lg:px-0">
          {blogs.map((blog, index) => (
            <div key={index} className="flex-shrink-0 w-full lg:w-auto">
              <div className="flex flex-col lg:flex-row items-start gap-4">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-auto lg:w-52 lg:h-36 object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{blog.category}</h3>
                  <h3 className="text-lg font-semibold hover:underline">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300">{blog.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
