import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import { seedData } from "./utils/bookingStorage";

export default function App() {
  useEffect(() => {
    seedData(); // 🔥 chạy khi app load
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/bookings" />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/add-booking" element={<BookingForm />} />
        <Route path="/edit-booking/:id" element={<BookingForm />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}