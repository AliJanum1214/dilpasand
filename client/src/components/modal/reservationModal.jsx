import React from "react";
import ReservationForm from "../reservation/private-dining/reservationForm";
import { X } from "lucide-react";

export default function ReservationModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-custom-primary bg-opacity-70">
      <div className="relative min-h-screen flex justify-center pt-[100px] pb-[50px]">
        <div className=" p-6 rounded-md max-w-lg w-full">
          <button
            onClick={onClose}
            className="absolute top-20 right-8 text-white text-xl font-bold"
          >
            <X />
          </button>
          <ReservationForm />
        </div>
      </div>
    </div>
  );
}
