"use client";
import { Clock, ClockPlus, MapPinHouse } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function MapInfoSection() {
  const mapRef = useRef(null);
  const contentRef = useRef(null);
  const [mapHeight, setMapHeight] = useState("250px");

  const infoSections = [
    {
      title: "Find Us",
      content: ["Dilpasand"],
      isBold: true,
      noBorder: true,
    },
    {
      title: (
        <>
          <Clock /> Hours
        </>
      ),
      content: ["Open daily – 11pm", "12 pm – 1 pm"],
    },
    {
      title: "Contact",
      content: ["Send us an email"],
      noBorder: true,
    },
    {
      title: (
        <>
          <MapPinHouse /> Nearby Stops
        </>
      ),
      content: [
        "Aldgate East (District, Hammersmith & City lines)",
        "Whitechapel Overground Station",
        "7 minutes",
      ],
    },
    {
      title: (
        <>
          <ClockPlus /> Opening Times
        </>
      ),
      content: ["Eid Al-Adha", "Hours to be announced"],
    },
    {
      title: "Flooring",
      content: [
        "Ground floor access",
        "Wheelchair accessible",
        "Hearing Dogs welcome",
      ],
    },
  ];

  useEffect(() => {
    const updateMapHeight = () => {
      if (window.innerWidth >= 768 && contentRef.current) {
        setMapHeight(`${contentRef.current.offsetHeight}px`);
      } else {
        setMapHeight("250px");
      }
    };

    updateMapHeight();
    window.addEventListener("resize", updateMapHeight);
    return () => window.removeEventListener("resize", updateMapHeight);
  }, []);

  return (
    <section className="bg-custom-primary pt-20 px-4 sm:px-6 md:px-8 lg:px-0 relative">
      <h2 className="text-custom-secondary text-4xl text-center font-heading uppercase mb-12">
        Planning your visit
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Map Section */}
        <div className="lg:w-1/2 w-full">
          <div
            ref={mapRef}
            style={{ height: mapHeight }}
            className="w-full rounded-lg shadow-lg overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9060656927622!2d-0.06617462472577375!3d51.514939310154226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876032480e42057%3A0xb7c86bdd21fc1816!2sDilpasand%20Restaurant!5e0!3m2!1sen!2s!4v1748265847189!5m2!1sen!2s"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Info Section */}
        <div
          className="lg:w-1/2 w-full flex flex-col space-y-6 relative"
          ref={contentRef}
        >
          {/* 3 rows */}
          {[
            [["Find Us"], ["Hours"]],
            [["Contact"], ["Nearby Stops"]],
            [["Flooring"], ["Opening Times"]],
          ].map(([leftKeys, rightKeys], rowIndex) => (
            <div key={rowIndex} className="flex flex-col sm:flex-row gap-4">
              {/* Left Column */}
              <div className="flex-1 border-b border-[#aa340d] pb-4 ">
                {infoSections
                  .filter(
                    (s) =>
                      typeof s.title === "string" && leftKeys.includes(s.title)
                  )
                  .map((section, index) => (
                    <div key={index}>
                      <h3
                        className={`text-base sm:text-lg font-medium uppercase tracking-wide mb-2 ${
                          section.title === "Find Us"
                            ? "text-yellow-500"
                            : "text-custom-secondary"
                        }`}
                      >
                        {section.title}
                      </h3>
                      {section.content.map((line, i) => (
                        <p
                          key={i}
                          className={`text-xs sm:text-sm text-gray-200 ${
                            section.isBold ? "font-bold" : ""
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block absolute left-[47.5%] top-0 h-full w-[1px] bg-[#aa340d] opacity-60" />
              <div className=" hidden md:block absolute left-[48%] top-0 h-full w-[1px] bg-[#aa340d] opacity-60" />
              <div className=" hidden md:block absolute left-[48.5%] top-0 h-full w-[1px] bg-[#aa340d] opacity-60" />

              {/* Right Column */}
              <div className="flex-1 border-b border-[#aa340d] pl-6">
                {infoSections
                  .filter(
                    (s) =>
                      typeof s.title !== "string" &&
                      rightKeys.some((key) => {
                        const children = React.Children.toArray(
                          s.title.props.children
                        );
                        return children.some(
                          (child) =>
                            typeof child === "string" && child.trim() === key
                        );
                      })
                  )
                  .map((section, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-base sm:text-lg font-medium uppercase tracking-wide text-custom-secondary flex items-center gap-1 mb-2">
                        {section.title}
                      </h3>
                      {section.content.map((line, lineIndex) => (
                        <p
                          key={lineIndex}
                          className="text-xs sm:text-sm text-gray-200"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-custom-secondary mt-8 p-4 text-center text-white">
        <h2 className="text-3xl text-yellow-500">Group Bookings</h2>
        <p>Get in touch for more large group bookings</p>
      </div>
    </section>
  );
}
