"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
  TablePagination,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";

export default function ReservationFromData() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          "https://dilpasandrestaurant.com/back/entries"
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch reservations");
        }

        if (data.success && Array.isArray(data.success)) {
          setReservations(data.success);
          setFilteredReservations(data.success);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = reservations.filter((res) =>
      [res.name, res.email, res.phone]
        .join(" ")
        .toLowerCase()
        .includes(lowerQuery)
    );
    setFilteredReservations(filtered);
    setPage(0); // reset to first page after search
  }, [searchQuery, reservations]);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  const visibleRows = filteredReservations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={{ xs: 2, md: 4 }} bgcolor="#120901" mx="auto">
      <div className="mt-36 max-w-6xl mx-auto">
        <h4 className="text-yellow-500 text-3xl text-center font-semibold mb-6">
          Reservation Data
        </h4>

        {/* Search Field */}
        <div className="flex flex-col  items-start  text-left space-y-4 my-4 ">
          <label htmlFor="search" className="text-white">
            Search Anything
          </label>
          <input
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search ..."
            className="bg-white border-none text-black outline-none p-3 rounded-lg max-w-sm"
          />
        </div>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ borderRadius: 2 }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Seats</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Reservation Time
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((reservation, index) => (
                <TableRow key={index} hover>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>{reservation.email}</TableCell>
                  <TableCell>{reservation.phone}</TableCell>
                  <TableCell>{reservation.seats}</TableCell>
                  <TableCell>
                    {reservation.reservation_time
                      ? dayjs(reservation.reservation_time).format(
                          "YYYY-MM-DD HH:mm"
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {dayjs(reservation.created_at).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
              {visibleRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No matching records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredReservations.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>
      </div>
    </Box>
  );
}
