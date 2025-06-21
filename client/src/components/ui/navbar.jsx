"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ReservationModal from "../modal/reservationModal";

const navLinks = [
  {
    name: "Our Story",
    href: "/#our_story",
  },
  {
    name: "Menu",
    href: "#menu",
  },
  {
    name: "Reservation",
    href: "/reservation",
  },
  {
    name: "Catering",
    href: "/catering",
  },
  {
    name: "Visit Us",
    href: "/#visit_us",
  },
];
export default function Navbar({ isModalOpen, setIsModalOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.95);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-10 h-[70px] bg-custom-primary text-white transition-shadow duration-300 ${
        isScrolled ? "shadow-xl" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div></div>
          <Link href={"/"}>
            <img src="/images/logo.png" alt="" className="w-[200px]" />
          </Link>
          <div className="flex items-center">
            {/* <button
              className="hidden md:inline-block bg-custom-secondary px-4 py-1 rounded-md text-sm lg:text-base transition custom-hover-bg-opacity"
              onClick={() => setIsModalOpen(true)}
            >
              Book a Table
            </button> */}
            <button
              className="md:hidden text-white text-2xl z-50"
              onClick={toggleMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-custom-primary fixed top-0 left-0 w-full h-screen transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          } overflow-hidden`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className="text-lg hover:text-[#aa340d] transition-colors duration-200"
                  >
                    <h4 className="relative group">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-custom-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    </h4>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="mt-8 bg-custom-secondary px-4 py-2 rounded-md text-base hover:bg-opacity-90 transition custom-hover-bg-opacity"
              onClick={() => setIsModalOpen(true)}
            >
              Book a Table
            </button>
          </div>
        </div>
      </div>

      <div className="z-50">
        {isModalOpen && (
          <ReservationModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </nav>
  );
}
