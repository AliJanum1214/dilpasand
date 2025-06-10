"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ReservationFromData from "@/components/admin/reservationFromData";
import ProtectedPopup from "@/components/protection/protectedPopup";

const AdminPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isAuthenticated = Cookies.get("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      setShowPopup(true);
    }
  }, []);

  if (showPopup) {
    return <ProtectedPopup onClose={() => setShowPopup(false)} />;
  }

  return (
    <div className="">
      <ReservationFromData />
    </div>
  );
};

export default AdminPage;
