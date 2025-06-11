"use client";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

// Reusable styles matching ReservationForm
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
};

export const DatePopup = ({
  open,
  onClose,
  onDateSelect,
  title,
  maxDate,
  minDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            maxDate={maxDate || dayjs()}
            minDate={minDate || undefined}
            slotProps={{
              textField: {
                sx: textFieldStyle,
                variant: "outlined",
              },
            }}
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

export default function DateFilter({ dateFilter, setDateFilter }) {
  const [fromDatePopupOpen, setFromDatePopupOpen] = useState(false);
  const [toDatePopupOpen, setToDatePopupOpen] = useState(false);

  const handleFilterChange = (event) => {
    setDateFilter({
      type: event.target.value,
      fromDate: null,
      toDate: null,
    });
  };

  const handleFromDateSelect = (date) => {
    setDateFilter((prev) => ({
      ...prev,
      fromDate: date ? date.format("YYYY-MM-DD") : null,
    }));
    setFromDatePopupOpen(false);
  };

  const handleToDateSelect = (date) => {
    setDateFilter((prev) => ({
      ...prev,
      toDate: date ? date.format("YYYY-MM-DD") : null,
    }));
    setToDatePopupOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor="#120901"
      p={2}
      borderRadius="10px"
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="date-filter-label" sx={{ color: "#aaa" }}>
          Date Filter
        </InputLabel>
        <Select
          labelId="date-filter-label"
          value={dateFilter.type}
          label="Date Filter"
          onChange={handleFilterChange}
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
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="yesterday">Yesterday</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
      </FormControl>

      {dateFilter.type === "custom" && (
        <Box display="flex" gap={2}>
          <TextField
            label="From Date"
            value={dateFilter.fromDate || ""}
            onClick={() => setFromDatePopupOpen(true)}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={textFieldStyle}
          />
          <TextField
            label="To Date"
            value={dateFilter.toDate || ""}
            onClick={() => setToDatePopupOpen(true)}
            InputProps={{ readOnly: true }}
            fullWidth
            sx={textFieldStyle}
          />
          <DatePopup
            open={fromDatePopupOpen}
            onClose={() => setFromDatePopupOpen(false)}
            onDateSelect={handleFromDateSelect}
            title="Select From Date"
            maxDate={dayjs()}
          />
          <DatePopup
            open={toDatePopupOpen}
            onClose={() => setToDatePopupOpen(false)}
            onDateSelect={handleToDateSelect}
            title="Select To Date"
            minDate={
              dateFilter.fromDate ? dayjs(dateFilter.fromDate) : undefined
            }
            maxDate={dayjs()}
          />
        </Box>
      )}
    </Box>
  );
}
