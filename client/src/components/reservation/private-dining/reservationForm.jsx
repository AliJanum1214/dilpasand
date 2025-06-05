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
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

    try {
      await sendEmail({
        to: "shampi.goli@gmail.com",
        subject: "New Reservation",
        text: `New reservation from ${formData.name} (${
          formData.email
        })\nPhone: ${formData.countryCode} ${
          formData.phone
        }\nDate: ${formData.date.format("YYYY-MM-DD")}\nTime: ${
          formData.time
        }\nSeats: ${formData.seats}`,
      });

      await sendEmail({
        to: formData.email,
        subject: "Reservation Confirmation",
        text: `Thank you for your reservation, ${
          formData.name
        }!\nDetails:\nDate: ${formData.date.format("YYYY-MM-DD")}\nTime: ${
          formData.time
        }\nSeats: ${formData.seats}`,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Email error:", error);
      alert("Error submitting reservation. Please try again.");
    }
  };

  const sendEmail = async (emailData) => {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });
    if (!response.ok) throw new Error("Email send failed");
    return response.json();
  };

  if (submitted) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
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
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      px={2}
      maxWidth={600}
      mx="auto"
      color="white"
    >
      {/* Name */}
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        sx={textFieldStyle}
      />

      {/* Email */}
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
        sx={textFieldStyle}
      />

      {/* Country Code + Phone */}
      <Grid container spacing={2} alignItems="center" marginY={1}>
        <Grid item xs={4}>
          <FormControl fullWidth required>
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
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
            error={!!phoneError}
            helperText={phoneError}
            sx={textFieldStyle}
          />
        </Grid>
      </Grid>

      {/* Date */}
      <TextField
        label="Date"
        value={formData.date ? formData.date.format("YYYY-MM-DD") : ""}
        onClick={() => setDatePopupOpen(true)}
        InputProps={{ readOnly: true }}
        required
        fullWidth
        margin="normal"
        sx={textFieldStyle}
      />
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

      {/* Time */}
      {/* Time */}
      <FormControl fullWidth margin="normal" required>
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
      {/* Submit */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: "400",
          bgcolor: "#aa340d",
        }}
        disabled={
          !formData.name ||
          !formData.email ||
          !formData.phone ||
          !formData.date ||
          !formData.time ||
          !!emailError ||
          !!phoneError
        }
      >
        Submit Reservation
      </Button>
    </Box>
  );
};

// Reusable styles
const textFieldStyle = {
  "& label": { color: "#aaa" },
  "&.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "#444" },
    "&:hover fieldset": { borderColor: "#666" },
    "&.Mui-focused fieldset": { borderColor: "white" },
  },
};

const selectStyle = {
  color: "white",
  "&.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#666" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
  "& .MuiSvgIcon-root": { color: "white" },
};

export default ReservationForm;
