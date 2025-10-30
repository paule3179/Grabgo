// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const apiAuth = require('../middleware/apiAuth');
const paymentController = require('../controllers/paymentController');

// POST /api/payments/checkout
router.post('/checkout', paymentController.checkout);

module.exports = router;

