import { bookingData } from "../bookingData";

const BOOKING_KEY = "hotel_bookings";

// 👉 Seed data lần đầu
export const seedData = () => {
  const existing = localStorage.getItem(BOOKING_KEY);
  if (!existing) {
    localStorage.setItem(BOOKING_KEY, JSON.stringify(bookingData));
  }
};

export const getBookings = () => {
  const data = localStorage.getItem(BOOKING_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBookings = (bookings) => {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
};

export const addBooking = (booking) => {
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
};

export const updateBooking = (id, updatedBooking) => {
  const bookings = getBookings().map((item) =>
    item.id === id ? updatedBooking : item
  );
  saveBookings(bookings);
};

export const cancelBooking = (id) => {
  const bookings = getBookings().map((item) =>
    item.id === id ? { ...item, status: "Cancelled" } : item
  );
  saveBookings(bookings);
};

export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find((item) => item.id === id);
};