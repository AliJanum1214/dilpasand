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
import dayjs from "dayjs";

// DatePopup Component
export const DatePopup = ({ open, onClose, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "#1e1e1e",
          color: "white",
        },
      }}
    >
      <DialogTitle sx={{ color: "white", bgcolor: "#121212" }}>
        Select Date
      </DialogTitle>
      <DialogContent sx={{ bgcolor: "#1e1e1e", pt: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#444",
                    },
                    "&:hover fieldset": {
                      borderColor: "#666",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#aaa",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "#1e1e1e" }}>
        <Button onClick={onClose} sx={{ color: "white" }}>
          Cancel
        </Button>
        <Button
          onClick={() => onDateSelect(selectedDate)}
          sx={{ color: "white" }}
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ReservationForm Component
const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: null,
    persons: 1,
    time: "",
  });
  const [datePopupOpen, setDatePopupOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
    "8:00 PM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date) => {
    setFormData({ ...formData, date });
    setDatePopupOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send email to owner
      await sendEmail({
        to: "shampi.goli@gmail.com",
        subject: "New Reservation",
        text: `New reservation from ${formData.name} (${formData.email})
        Date: ${formData.date.format("YYYY-MM-DD")}
        Time: ${formData.time}
        Persons: ${formData.persons}`,
      });

      // Send confirmation to user
      await sendEmail({
        to: formData.email,
        subject: "Reservation Confirmation",
        text: `Thank you for your reservation, ${formData.name}!
        Your reservation details:
        Date: ${formData.date.format("YYYY-MM-DD")}
        Time: ${formData.time}
        Persons: ${formData.persons}`,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error sending emails:", error);
      alert("Error submitting reservation. Please try again.");
    }
  };

  const sendEmail = async (emailData) => {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return response.json();
  };

  if (submitted) {
    return (
      <Box
        textAlign="center"
        p={4}
        sx={{ bgcolor: "black", color: "white", minHeight: "100vh" }}
      >
        <Typography variant="h5" gutterBottom>
          Thank You!
        </Typography>
        <Typography>
          Your reservation has been submitted. Check your email for
          confirmation.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 4,
        bgcolor: "black",
        color: "white",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
        mt: 4,
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "white", mb: 3, textAlign: "center" }}
      >
        Make a Reservation
      </Typography>

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        margin="normal"
        required
        sx={{
          "& .MuiInputLabel-root": { color: "#aaa" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#666" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            color: "white",
          },
          mb: 2,
        }}
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
        sx={{
          "& .MuiInputLabel-root": { color: "#aaa" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#666" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            color: "white",
          },
          mb: 2,
        }}
      />

      <TextField
        fullWidth
        label="Date"
        value={formData.date ? formData.date.format("YYYY-MM-DD") : ""}
        onClick={() => setDatePopupOpen(true)}
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        required
        sx={{
          "& .MuiInputLabel-root": { color: "#aaa" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#666" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            color: "white",
          },
          mb: 2,
        }}
      />

      <DatePopup
        open={datePopupOpen}
        onClose={() => setDatePopupOpen(false)}
        onDateSelect={handleDateSelect}
      />

      <TextField
        fullWidth
        label="Number of Persons"
        name="persons"
        type="number"
        value={formData.persons}
        onChange={handleChange}
        margin="normal"
        inputProps={{ min: 1, max: 20 }}
        required
        sx={{
          "& .MuiInputLabel-root": { color: "#aaa" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#444" },
            "&:hover fieldset": { borderColor: "#666" },
            "&.Mui-focused fieldset": { borderColor: "white" },
            color: "white",
          },
          mb: 2,
        }}
      />

      <FormControl fullWidth margin="normal" required sx={{ mb: 3 }}>
        <InputLabel sx={{ color: "#aaa" }}>Time</InputLabel>
        <Select
          name="time"
          value={formData.time}
          onChange={handleChange}
          label="Time"
          sx={{
            color: "white",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#444",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#666",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          {timeSlots.map((time) => (
            <MenuItem
              key={time}
              value={time}
              sx={{
                color: "white",
                bgcolor: "#1e1e1e",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              {time}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 3,
          py: 1.5,
          fontSize: "1rem",
          fontWeight: "bold",
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
        disabled={
          !formData.name || !formData.email || !formData.date || !formData.time
        }
      >
        Submit Reservation
      </Button>
    </Box>
  );
};

export default ReservationForm;
