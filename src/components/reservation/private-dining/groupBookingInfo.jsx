import React from "react";
import { Box, Typography } from "@mui/material";

const GroupBookingInfo = () => {
  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 4,
        bgcolor: "#aa340d",
        borderRadius: 2,
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom className="text-yellow-500">
        <h4>Group Booking</h4>
      </Typography>
      <Typography variant="body1">
        <p>
          For groups larger than 6, we offer exclusive private dining
          experiences. Please contact us directly to arrange your special event
          or large gathering.
        </p>
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Call us at: +92-123-456-7890
      </Typography>
    </Box>
  );
};

export default GroupBookingInfo;
