"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  background: "#aa340d",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: 600,
  borderRadius: "6px",
  textTransform: "none",
  "&:hover": {
    transform: "translateY(-2px)",
    transition: "all 0.3s ease",
  },
}));

export default function NewsletterSection() {
  const [formData, setFormData] = useState({
    email: "",
    birthday: "",
    postalCode: "",
    cafe: "",
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: Add API call
  };

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#f5e8c7] to-[#d4a373] grid grid-cols-1 md:grid-cols-[70%_30%] text-white">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[url('/images/newsletter-bg-pattern.png')] bg-repeat opacity-10" />

      {/* Left Section */}
      <motion.div
        className="relative w-full flex justify-center items-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/newsletter.jpg")' }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.h1
          className="z-10 text-white text-4xl md:text-6xl font-serif text-center px-4 drop-shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          "From Karachi with Love"
        </motion.h1>
      </motion.div>

      {/* Divider */}
      <div
        className="hidden z-20 md:block absolute top-0 h-full w-[1px] bg-custom-secondary"
        style={{ left: "70%" }}
      />
      <div
        className="hidden z-30 md:block absolute top-0 h-full w-[1px] bg-custom-secondary"
        style={{ left: "70.25%" }}
      />
      <div
        className="hidden z-20 md:block absolute top-0 h-full w-[1px] bg-custom-secondary"
        style={{ left: "70.5%" }}
      />
      <div
        className="hidden z-20 md:block absolute top-0 h-full w-[1px] bg-custom-secondary"
        style={{ left: "70.75%" }}
      />
      <div
        className="hidden z-20 md:block absolute top-0 h-full w-[1px] bg-custom-secondary"
        style={{ left: "71%" }}
      />

      {/* Right Section */}
      <motion.div
        ref={formRef}
        initial={{ x: 100, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-custom-primary bg-opacity-50 backdrop-blur-md text-white p-6 md:p-10 flex items-center relative z-10 border-t-4 border-b-4 custom-border"
      >
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-sm text-yellow-400 tracking-widest font-semibold uppercase">
              Newsletter
            </h2>
            <motion.h1
              className="text-2xl md:text-3xl font-serif text-white font-medium leading-snug tracking-wider uppercase"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Subscribe to the Dishoom Newsletter
            </motion.h1>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.5",
              }}
              className="text-white/80 leading-relaxed mt-2"
            >
              First-dibs on new launches, occasional recipes, and other Dishoom
              goings-on — straight to your inbox.
            </p>
          </div>

          {/* Email */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused": { color: "white" },
                },
              }}
              InputProps={{
                style: { color: "white", fontSize: "14px" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "1px",
                  },
                  "& .MuiInputBase-input": { padding: "10px 12px" },
                },
              }}
            />
          </motion.div>

          {/* Birthday */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <TextField
              label="Select date for annual surprise"
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: { color: "white", fontSize: "14px" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "1px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 12px",
                    colorScheme: "dark", // dark mode for calendar
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // calendar icon color
                  },
                },
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: "white",
                  "&.Mui-focused": { color: "white" },
                },
              }}
            />
          </motion.div>

          {/* Postal Code */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <TextField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="e.g. 12345"
              fullWidth
              variant="outlined"
              InputProps={{
                style: { color: "white", fontSize: "14px" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "1px",
                  },
                  "& .MuiInputBase-input": { padding: "10px 12px" },
                },
              }}
              InputLabelProps={{
                style: { color: "white" },
                sx: {
                  "&.Mui-focused": { color: "white" },
                },
              }}
            />
          </motion.div>

          {/* Cafe Selection */}
          {/* Cafe Selection */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <FormControl
              fullWidth
              variant="outlined"
              sx={{ position: "relative", zIndex: 20 }}
            >
              <InputLabel
                id="cafe-label"
                sx={{
                  color: "white",
                  fontSize: "14px",
                  "&.Mui-focused": { color: "white" },
                }}
              >
                Local Café
              </InputLabel>
              <Select
                labelId="cafe-label"
                name="cafe"
                value={formData.cafe}
                onChange={handleChange}
                label="Local Café"
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em style={{ opacity: 0.7 }}>...</em>;
                  }
                  return selected;
                }}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "1px",
                  },
                  "& .MuiSelect-select": {
                    padding: "10px 12px",
                    fontSize: "14px",
                  },
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "white",
                      color: "black",
                      "& .MuiMenuItem-root": {
                        fontSize: "14px",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#aa340d",
                          color: "white",
                        },
                      },
                    },
                  },
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="Battersea">Battersea</MenuItem>
                <MenuItem value="Canary Wharf">Canary Wharf</MenuItem>
                <MenuItem value="Covent Garden">Covent Garden</MenuItem>
              </Select>
            </FormControl>
          </motion.div>
          {/* Consent */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  sx={{
                    color: "white",
                    "&.Mui-checked": { color: "#aa340d" },
                  }}
                />
              }
              label="I agree to receive emails from Dishoom"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "14px",
                  color: "white",
                },
              }}
            />
          </motion.div>

          {/* Submit */}
          <div className="bg-custom-secondary w-full flex justify-center items-center p-2">
            <button className="text-white border-black border-2 w-full tracking-widest">
              Subscribe
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
