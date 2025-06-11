"use client";
import React from "react";
import { createPortal } from "react-dom";
import ReservationForm from "../reservation/private-dining/reservationForm";
import { X } from "lucide-react";

export default function ReservationModal({ onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-white/5 backdrop-blur-sm flex justify-center items-center h-screen"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-md h-screen flex justify-center items-center">
        <div className="bg-custom-primary flex flex-col relative p-4 rounded-lg">
          <div
            onClick={onClose}
            className=" text-white hover:text-gray-300 cursor-pointer transition flex justify-end items-center"
          >
            <X size={24} />
          </div>

          <ReservationForm onClose={onClose} />
        </div>
      </div>
    </div>,
    document.body
  );
}
