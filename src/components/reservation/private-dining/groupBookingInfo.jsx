import React from "react";
import { Box } from "@mui/material";
import DilpasandInfo from "@/components/dilpasand-info/dilpasandInfo";

const GroupBookingInfo = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 2,
        bgcolor: "#aa340d",
        borderRadius: 2,
        color: "white",
      }}
    >
      <h4 className="text-yellow-500">Group Booking</h4>

      <p>
        For groups larger than 6, we offer exclusive private dining experiences.
        Please contact us directly to arrange your special event or large
        gathering.
      </p>
      <div className="mt-3">
        <DilpasandInfo />
      </div>
    </Box>
  );
};

export default GroupBookingInfo;
