const Booking = require('../models/order');

const bookingController = {
  createBooking: async (bookingData) => {
    const booking = new Booking(bookingData);
    await booking.save();
    return booking;
  },

  getBookings: async () => {
    return await Booking.find().populate('user').populate('foodItem');
  },

  getBookingById: async (id) => {
    const booking = await Booking.findById(id).populate('user').populate('foodItem');
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  },

  updateBooking: async (id, updateData) => {
    const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  },

  deleteBooking: async (id) => {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  },

  getBookingsByUser: async (userId) => {
    return await Booking.find({ user: userId }).populate('foodItem');
  },

  getBookingsByDate: async (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return await Booking.find({ date: { $gte: start, $lte: end } }).populate('user').populate('foodItem');
  }
};

module.exports = bookingController;
