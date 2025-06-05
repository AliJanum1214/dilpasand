"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const DatePopup = ({ open, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Date</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth sx={textFieldStyle} />
            )}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onDateSelect(selectedDate)}>Select</Button>
      </DialogActions>
    </Dialog>
  );
};

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+92",
    date: null,
    seats: 1,
    time: "",
  });
  const [datePopupOpen, setDatePopupOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const timeSlots = [
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
  ];
  const countryCodes = ["+1", "+44", "+92", "+61", "+91"];

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{7,11}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email address");
    }
    if (name === "phone") {
      setPhoneError(validatePhone(value) ? "" : "Invalid phone number");
    }
  };

  const handleDateSelect = (date) => {
    setFormData((prev) => ({ ...prev, date }));
    setDatePopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email address");
      return;
    }
    if (!validatePhone(formData.phone)) {
      setPhoneError("Invalid phone number");
      return;
    }

    dayjs.extend(customParseFormat);

    try {
      const formattedTime = dayjs(formData.time, "h:mm A").format("HH:mm:ss");
      const formattedDateTime = formData.date
        ? `${formData.date.format("YYYY-MM-DD")} ${formattedTime}`
        : null;

      const bodyData = {
        id: uuidv4(), // Generate a new UUID
        type: "reservation",
        opt_out: 1,
        referral_source: "Google Search",
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`,
        // date: formData.date ? formData.date.format("YYYY-MM-DD") : null, // Include date
        seats: formData.seats,
        reservation_time: formattedDateTime, // Format: YYYY-MM-DD HH:mm:ss
      };

      console.log("Request body:", bodyData); // Log the payload before sending

      const response = await fetch(
        "https://dilpasandrestaurant.com/back/entries/insert",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData), // Stringify the body
        }
      );

      console.log("Response status:", response.status); // Log response status

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Try to parse error response
        console.error("Response error:", errorData); // Log server error details
        throw new Error(`Failed to submit reservation: ${response.statusText}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error.message); // Log the error
      alert("Error submitting reservation. Please try again.");
    }
  };

  if (submitted) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={2}
        color="white"
      >
        <Typography variant="h5" gutterBottom>
          Thank You!
        </Typography>
        <Typography>
          Your reservation has been submitted. Please check your email.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      p={3}
      maxWidth={600}
      mx="auto"
      bgcolor="#120901"
      color="white"
      borderRadius="10px"
      gap={0}
    >
      {/* Name and Email in one row */}
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          sx={{ ...textFieldStyle, flex: 1 }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          error={!!emailError}
          helperText={emailError}
          sx={{ ...textFieldStyle, flex: 1 }}
        />
      </Box>

      {/* Country Code + Phone in a single row */}
      <Box display="flex" gap={2} alignItems="center">
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel sx={{ color: "#aaa" }}>Code</InputLabel>
          <Select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            label="Code"
            sx={selectStyle}
          >
            {countryCodes.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          error={!!phoneError}
          helperText={phoneError}
          sx={{ ...textFieldStyle, flex: 2, mb: "5px" }}
        />
      </Box>

      {/* Date and Time in one row */}
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="Date"
          value={formData.date ? formData.date.format("YYYY-MM-DD") : ""}
          onClick={() => setDatePopupOpen(true)}
          InputProps={{ readOnly: true }}
          required
          fullWidth
          margin="normal"
          sx={{ ...textFieldStyle, flex: 1 }}
        />
        <FormControl fullWidth margin="normal" required sx={{ flex: 1 }}>
          <InputLabel sx={{ color: "#aaa" }}>Time</InputLabel>
          <Select
            name="time"
            value={formData.time}
            onChange={handleChange}
            label="Time"
            sx={selectStyle}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "white",
                  color: "black",
                  maxHeight: 300,
                },
              },
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              disablePortal: true,
            }}
          >
            {timeSlots.map((time) => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DatePopup
        open={datePopupOpen}
        onClose={() => setDatePopupOpen(false)}
        onDateSelect={handleDateSelect}
      />

      {/* Seats */}
      <TextField
        label="Number of Persons"
        name="seats"
        type="number"
        inputProps={{ min: 1, max: 8 }}
        value={formData.seats}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        sx={textFieldStyle}
        helperText="For bookings of more than 6 people, please call us."
        FormHelperTextProps={{ sx: { color: "#aaa" } }}
      />

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: "400",
          bgcolor: "#aa340d",
          color: "white",
        }}
        disabled={
          !formData.name ||
          !formData.email ||
          !formData.phone ||
          !formData.date ||
          !formData.time
        }
      >
        Submit Reservation
      </Button>
    </Box>
  );
};

// Reusable styles
const textFieldStyle = {
  width: "100%",
  "& label": { color: "#aaa" },
  "&.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& input": {
      fontSize: "16px",
      height: "50px",
      padding: "0 14px",
      boxSizing: "border-box",
    },
    "& fieldset": { borderColor: "#444" },
    "&:hover fieldset": { borderColor: "#666" },
    "&.Mui-focused fieldset": { borderColor: "white" },
  },
};

const selectStyle = {
  color: "white",
  height: "50px",
  "&.Mui-focused": {
    color: "white",
  },
  "& .MuiSelect-select": {
    fontSize: "16px",
    height: "50px",
    padding: "0 24px 0 14px",
    boxSizing: "border-box",
    lineHeight: "50px",
    textAlign: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
  "& .MuiSvgIcon-root": { color: "white" },
};

export default ReservationForm;
