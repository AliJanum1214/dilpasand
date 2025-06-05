import ReservationForm from "@/components/reservation/reservationForm";
import Link from "next/link";
import React from "react";

export default function Reservation() {
  return (
    <>
      <div className=" px-4 sm:px-0 py-20 bg-custom-primary text-white">
        <div className="flex justify-between items-start max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 space-y-4">
            <div>
              <h3 className="text-yellow-500 text-xl italic sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl font-bold leading-tight">
                Exclusive
              </h3>
              <h2 className="text-3xl font-bold text-custom-secondary">
                PRIVATE DINING
              </h2>
            </div>
            <p className="text-xs" style={{ fontSize: "0.9rem" }}>
              {" "}
              We can accommodate over 70 people, and our expert team are on hand
              to seamlessly manage group bookings and large events.
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              If you’d like to host a private party at City Spice, please get in
              touch with our friendly manager. In order to make a private party
              booking please contact our manager through this email&nbsp;
              <Link
                href={"mailto:support@dilpasand@gmail.com"}
                className="hover:underline"
              >
                support@dilpasand@gmail.com
              </Link>{" "}
              london.
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              Alternatively, you can ask for a private party using the booking
              from above.
            </p>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div>
              <h3 className="text-yellow-500 text-xl italic sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] 2xl:text-5xl font-bold leading-tight">
                Call Us
              </h3>
              <h2 className="text-3xl font-bold text-custom-secondary">
                RESERVE BY PHONE
              </h2>
            </div>
            <p style={{ fontSize: "0.9rem" }}>
              You can call us at the numbers below to make a booking and reserve
              your table via telephone.
            </p>
          </div>
        </div>
        <ReservationForm />
      </div>
    </>
  );
}
