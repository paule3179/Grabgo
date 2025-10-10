const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Create a new booking
router.post('/', (req, res) => {
  const bookingData = req.body;
  bookingController.createBooking(bookingData)
    .then(data => {
      res.status(201).json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get all bookings
router.get('/', (req, res) => {
  bookingController.getBookings()
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get booking by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  bookingController.getBookingById(id)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Booking not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Update booking by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  bookingController.updateBooking(id, updateData)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Booking not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Delete booking by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  bookingController.deleteBooking(id)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Booking not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Get bookings by user
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  bookingController.getBookingsByUser(userId)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get bookings by date
router.get('/date/:date', (req, res) => {
  const { date } = req.params;
  bookingController.getBookingsByDate(date)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
