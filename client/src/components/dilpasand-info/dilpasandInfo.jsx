import { Mail, Phone } from "lucide-react";
import React from "react";

export default function DilpasandInfo() {
  return (
    <div>
      <div className="flex items-start gap-3 mb-8">
        <div className="flex gap-4">
          <div>
            <h2 className="text-lg text-yellow-500">Phone:</h2>
            <a
              href="tel:+442072470285"
              className="flex items-center gap-1 text-white hover:underline"
            >
              <Phone size={20} /> +44 20 7247 0285
            </a>
            <a
              href="tel:+447368657788"
              className="flex items-center gap-1 text-white hover:underline"
            >
              <Phone size={20} /> +44 73 6865 7788
            </a>
          </div>
          <div>
            <h2 className="text-lg text-yellow-500">Email:</h2>
            <a
              href="mailto:info@dilpasandrestaurant.com"
              className="flex items-center gap-1 text-white hover:underline"
            >
              <Mail size={14} /> info@dilpasandrestaurant.com
            </a>
            <a
              href="mailto:catering@dilpasandrestaurant.com"
              className="flex items-center gap-1 text-white hover:underline"
            >
              <Mail size={14} /> catering@dilpasandrestaurant.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
