"use client";
import React, { useState, useEffect, useRef } from "react";
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
import { X } from "lucide-react";

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

const ReservationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+44",
    date: null,
    seats: 1,
    time: "",
  });
  const [datePopupOpen, setDatePopupOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const countryCodeRef = useRef(null);
  const timeRef = useRef(null);

  const timeSlots = [
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
    "10:00 PM",
    "12:00 AM",
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
        id: uuidv4(),
        type: "reservation",
        opt_out: 1,
        referral_source: "Google Search",
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode}${formData.phone}`,
        seats: formData.seats,
        reservation_time: formattedDateTime,
      };
      const response = await fetch(
        "https://dilpasandrestaurant.com/back/entries/insert",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to submit reservation: ${response.statusText}`);
      }

      setSubmitted(true);
    } catch (error) {
      alert("Error submitting reservation. Please try again.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isCountryCodeOpen) {
        setIsCountryCodeOpen(false);
      }
      if (isTimeOpen) {
        setIsTimeOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCountryCodeOpen, isTimeOpen]);

  if (submitted) {
    return (
      <div className="bg-custom-secondary text-center flex flex-col items-center justify-center p-4 rounded-lg">
        <h5 className="text-yellow-500 text-3xl">Thank You!</h5>
        <p>Your reservation has been submitted. Please check your email.</p>
      </div>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxWidth={600}
      mx="auto"
      bgcolor="#120901"
      color="white"
      borderRadius="10px"
      className="relative"
      gap={0}
    >
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
            open={isCountryCodeOpen}
            onOpen={() => setIsCountryCodeOpen(true)}
            onClose={() => setIsCountryCodeOpen(false)}
            ref={countryCodeRef}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "white",
                  color: "black",
                  maxHeight: 300,
                },
              },
            }}
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
            open={isTimeOpen}
            onOpen={() => setIsTimeOpen(true)}
            onClose={() => setIsTimeOpen(false)}
            ref={timeRef}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "white",
                  color: "black",
                  maxHeight: 300,
                },
              },
              disableScrollLock: true,
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
      <button
        type="submit"
        className="text-white bg-custom-secondary hover:translate-y-[4px] transition ease-in w-full p-3 flex justify-center items-center rounded-lg"
        disabled={
          !formData.name ||
          !formData.email ||
          !formData.phone ||
          !formData.date ||
          !formData.time
        }
      >
        Submit Reservation
      </button>
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
