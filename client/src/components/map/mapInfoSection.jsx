"use client";
import { Clock, ClockPlus, Mail, MapPinHouse, Phone } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function MapInfoSection() {
  const mapRef = useRef(null);
  const contentRef = useRef(null);
  const [mapHeight, setMapHeight] = useState("250px");

  const infoSections = [
    {
      title: (
        <>
          <Clock /> Hours
        </>
      ),
      content: ["Mid day to 11:30 pm"],
    },
    {
      title: (
        <>
          <MapPinHouse /> Nearby Stops
        </>
      ),
      content: [
        <ul className="list-disc text-left sm:text-base text-white leading-relaxed overflow-hidden">
          <li className="">
            <p className="text-sm sm:text-base text-white leading-relaxed overflow-hidden">
              Aldgate East (District, Hammersmith & City lines)
            </p>
          </li>
          <li>
            <p className="text-sm sm:text-base text-white leading-relaxed overflow-hidden">
              Whitechapel (Elizabeth Line)
            </p>
          </li>
          <li>
            <p className="text-sm sm:text-base text-white leading-relaxed overflow-hidden">
              Liverpool Street (Central, Circle, National rail)
            </p>
          </li>
        </ul>,
      ],
    },
    {
      title: "Flooring",
      content: [
        "Available for deliveries on Uber eats",
        <>
          <Link
            href={
              "https://www.ubereats.com/gb/store/dilpasand-whitechapel/fAOdlibgQ8q4taM3finjeg"
            }
            className="flex gap-2 items-center hover:underline"
          >
            <img src="./images/uber_eats_logo.png" alt="" className="w-7 h-7" />
            <p>Dilpasand (Whitechapel)</p>
          </Link>
        </>,
      ],
    },
    {
      title: "Contact",
      content: [
        <p
          key="phone1"
          className="flex items-center gap-1 text-xs text-white leading-relaxed overflow-hidden"
        >
          +44 20 7247 0285
        </p>,
        <p
          key="phone2"
          className="flex items-center gap-1 text-sm sm:text-base text-white leading-relaxed overflow-hidden"
        >
          <Phone size={20} /> +44 73 6865 7788
        </p>,
      ],
    },
  ];

  useEffect(() => {
    const updateMapHeight = () => {
      if (window.innerWidth >= 768 && contentRef.current) {
        // Use setTimeout to ensure all elements are rendered
        setTimeout(() => {
          const height = contentRef.current.offsetHeight;
          setMapHeight(`${height}px`);
        }, 0);
      } else {
        setMapHeight("250px");
      }
    };

    updateMapHeight();
    window.addEventListener("resize", updateMapHeight);
    return () => window.removeEventListener("resize", updateMapHeight);
  }, []);

  return (
    <section
      className="section flex flex-col justify-center bg-custom-primary relative px-4 md:px-0"
      id="visit_us"
    >
      <h2 className="text-custom-secondary text-4xl text-center font-heading uppercase mb-12">
        Planning your visit
      </h2>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Map Section */}
        <div className="lg:w-1/2 w-full">
          <div
            ref={mapRef}
            style={{ height: mapHeight }}
            className="w-full rounded-md shadow-lg overflow-hidden"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {infoSections.map((section, index) => (
              <div
                key={index}
                className="bg-white/5 shadow-2xl rounded-md p-4 text-center min-h-[150px] flex flex-col items-center "
              >
                <h3
                  className={`text-base sm:text-lg font-medium uppercase tracking-wide mb-2 ${
                    section.className || "text-custom-secondary"
                  } flex items-center justify-center gap-1`}
                >
                  {section.title}
                </h3>
                {section.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-sm sm:text-base text-white leading-relaxed overflow-hidden"
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="bg-custom-secondary rounded-md p-4 text-center">
            <h2 className="text-3xl text-yellow-500">Group Bookings</h2>
            <p className="text-sm sm:text-base text-white leading-relaxed overflow-hidden my-3">
              Call us for customized packages & hiring our private dining space
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
