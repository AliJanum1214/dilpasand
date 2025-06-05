import React from "react";
import ReservationForm from "../reservation/private-dining/reservationForm";
import { X } from "lucide-react";

export default function ReservationModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-white/5 backdrop-blur-sm flex justify-center items-center">
      <div className="relative w-full max-w-md top-[70px]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-white hover:text-gray-300 transition"
        >
          <X size={24} />
        </button>
        <ReservationForm />
      </div>
    </div>
  );
}
