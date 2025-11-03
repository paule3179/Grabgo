// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

// POST /api/payments/checkout - requires authentication
router.post('/checkout', authenticateToken, paymentController.checkout);

module.exports = router;

