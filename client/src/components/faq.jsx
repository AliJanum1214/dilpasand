"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CircleHelp, Plus, X } from "lucide-react";

export default function Faq() {
  const [open, setOpen] = useState(0);
  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };
  const faqsData = [
    {
      question: "How can I book an Umrah tour package?",
      answer: (
        <div>
          <p>Our booking process is simple and efficient:</p>
          <ul className="mt-2 flex flex-col space-y-3 list-disc list-inside">
            <li>
              Select your preferred <b>Umrah package</b>
            </li>
            <li>
              Choose flights, hotels, and transportation as{" "}
              <b>per your convenience</b>
            </li>
            <li>Securely complete your booking online</li>
            <li>Receive instant confirmation and travel details</li>
          </ul>
        </div>
      ),
    },
    {
      question: "What documents do I need for Umrah?",
      answer: (
        <>
          <p>To perform Umrah, you’ll need:</p>
          <ul className="mt-2 flex flex-col space-y-3 list-disc list-inside">
            <li>
              A <b>valid passport</b> (with at least 6 months validity)
            </li>
            <li>
              An <b>Umrah visa</b> (we assist in visa processing)
            </li>
            <li>
              <b>Confirmed hotel & flight bookings</b>
            </li>
            <li>
              Proof of <b>COVID-19 vaccinations</b> (if required)
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "Can I combine my Umrah with other travel destinations?",
      answer: (
        <>
          Yes! With <b>Booku</b>, you can add destinations like{" "}
          <b>Turkey, UAE, and Oman</b> to your Umrah journey. Experience both{" "}
          <b>spiritual and leisure travel</b> in one trip.
        </>
      ),
    },
    {
      question: "What are the cancellation and refund policies?",
      answer: (
        <>
          If you need to cancel, we offer <b>flexible refund options</b> based
          on your package type. Some hotel and flight bookings may have{" "}
          <b>non-refundable policies</b>, but we’ll assist in getting the best
          possible refund for you.
        </>
      ),
    },
    {
      question: "What kind of accommodations are available?",
      answer: (
        <>
          We offer a wide range of hotels, from <b>budget-friendly stays</b> to{" "}
          <b>luxury accommodations</b> near{" "}
          <b>Masjid Al Haram & Masjid Nabawi</b>, ensuring you have a{" "}
          <b>comfortable</b> and <b>convenient</b> stay.
        </>
      ),
    },
  ];

  return (
    <div className="relative">
      <div className="mx-auto">
        {/* FAQ List */}
        <div className="rounded-xl space-y-4">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className={`cursor-pointer transition-colors duration-300 bg-custom-tertiary px-2 sm:px-4 py-5 sm:py-8 rounded-2xl shadow-lg
                ${open === index ? "bg-custom-tertiary" : ""}
                ${index === faqsData.length - 1 ? "rounded-b-lg" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              {/* FAQ Question */}
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <span className="text-xl sm:text-3xl font-bold transition-all duration-300">
                    <CircleHelp size={24} />
                  </span>
                  <h3 className="font-[600] text-[16px] -mt-1">
                    {faq.question}
                  </h3>
                </div>
                {/* Toggle Icon */}
                <span
                  className={`rounded-md mx-1 p-1 sm:p-2 transition-transform duration-300
                   `}
                >
                  {open === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </div>

              {/* FAQ Answer */}
              <div
                className={`ml-2 overflow-hidden transition-all duration-500 ease-in-out
                  ${
                    open === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0 mt-0"
                  }`}
              >
                <div className="text-custom-quaternary mt-2 text-[11px] sm:text-sm tracking-wide">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
