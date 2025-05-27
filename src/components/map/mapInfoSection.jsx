import React from "react";

export default function MapInfoSection() {
  const infoSections = [
    {
      title: "Find Us",
      content: ["Dilpasand"],
      isBold: true,
    },
    {
      title: "Hours",
      content: ["Open daily – 11pm", "12 pm – 1 pm"],
    },
    {
      title: "Contact",
      content: ["Send us an email"],
    },
    {
      title: "Nearby Stops",
      content: [
        "Audgete Exir (Distant, Hammersmith & City lines)",
        "Whitechapel Overground Station",
        "7 minutes",
      ],
    },
    {
      title: "Special Opening Times",
      content: ["Eid Ar Adha", "Hours to be announced"],
    },
    {
      title: "Flooring",
      content: [
        "Ground floors access",
        "Wheelchair accessible to use",
        "Hearing Dogs welcomed",
      ],
    },
    {
      title: "Group Bookings",
      content: ["Get in touch for more large group bookings"],
      spanTwo: true, // Flag to indicate this section spans two columns
    },
  ];
  return (
    <section className="bg-custom-primary py-20 md:px-0 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Map Section */}
        <div className="lg:w-1/2 w-full">
          <div className="">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.9060656927622!2d-0.06617462472577375!3d51.514939310154226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876032480e42057%3A0xb7c86bdd21fc1816!2sDilpasand%20Restaurant!5e0!3m2!1sen!2s!4v1748265847189!5m2!1sen!2s"
              width="100%"
              height="250"
              className="sm:h-[300px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] w-full rounded-lg shadow-lg"
              allowFullScreen
              loading="lazy"
              style={{ borderRadius: "12px" }}
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Info Sections */}
        <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
          {infoSections.map((section, index) => (
            <div key={index} className={section.spanTwo ? "" : ""}>
              <h3 className="text-lg font-[400] text-white uppercase">
                {section.title}
              </h3>
              {section.content.map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  className={`
                text-sm text-gray-200`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}{" "}
        </div>
      </div>
    </section>
  );
}
