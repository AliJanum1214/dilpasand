import React from "react";

export default function MapInfoSection() {
  const infoSections = [
    {
      title: "Find Us",
      content: ["Dilpasand"],
      isBold: true,
      noBorder: true,
    },
    {
      title: "Hours",
      content: ["Open daily – 11pm", "12 pm – 1 pm"],
    },
    {
      title: "Contact",
      content: ["Send us an email"],
      noBorder: true,
    },
    {
      title: "Nearby Stops",
      content: [
        "Aldgate East (District, Hammersmith & City lines)",
        "Whitechapel Overground Station",
        "7 minutes",
      ],
    },
    {
      title: "Special Opening Times",
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
    {
      title: "Group Bookings",
      content: ["Get in touch for more large group bookings"],
      spanTwo: true,
    },
  ];

  return (
    <section className="bg-custom-primary py-10 px-4 sm:px-6 md:px-8 lg:px-0">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Map Section */}
        <div className="lg:w-1/2 w-full">
          <div className="w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9060656927622!2d-0.06617462472577375!3d51.514939310154226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876032480e42057%3A0xb7c86bdd21fc1816!2sDilpasand%20Restaurant!5e0!3m2!1sen!2s!4v1748265847189!5m2!1sen!2s"
              width="100%"
              height="200"
              className="w-full rounded-lg shadow-lg sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]"
              allowFullScreen
              loading="lazy"
              style={{ borderRadius: "12px" }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Info Sections */}
        <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {infoSections.map((section, index) => (
            <div
              key={index}
              className={`
                ${section.spanTwo ? "sm:col-span-2" : ""}
                ${
                  !section.noBorder
                    ? "border border-gray-300 p-3 sm:p-4 rounded-md"
                    : "p-3 sm:p-4"
                }
              `}
            >
              <h3
                className={`
                  text-base sm:text-lg font-[400] uppercase tracking-wide
                  ${
                    section.title === "Find Us" || section.title === "Contact"
                      ? "text-yellow-500"
                      : "text-custom-secondary"
                  }
                `}
              >
                {section.title}
              </h3>
              {section.content.map((line, lineIndex) => (
                <p
                  key={lineIndex}
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
      </div>
    </section>
  );
}
