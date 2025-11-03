// controllers/paymentController.js
const Stripe = require('stripe');
const axios = require('axios');
require('dotenv').config();

//  Load keys from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// For Flutterwave (Mobile Money + Bank Transfer)
const FLW_SECRET = process.env.FLW_SECRET_KEY;

// Payment Controller
const paymentController = {
  // POST /api/payments/checkout
  async checkout(req, res) {
    try {
      const { amount, currency = 'GHS', method, orderId, phoneNumber } = req.body;

      if (!amount || !method || !orderId) {
        return res.status(400).json({ message: 'amount, orderId, and method are required' });
      }

      let paymentResponse;

      //  Cash Payment
      if (method === 'cash') {
        paymentResponse = {
          status: 'pending',
          message: 'Cash payment selected. Awaiting payment on delivery.',
        };
      }

      //  Card Payment (Stripe)
      else if (method === 'card') {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Stripe works in smallest currency units
          currency: currency.toLowerCase(),
          payment_method_types: ['card'],
          description: `Order #${orderId}`,
        });

        paymentResponse = {
          status: 'pending',
          message: 'Card payment initiated via Stripe',
          clientSecret: paymentIntent.client_secret,
        };
      }

      //  Mobile Money (Flutterwave)
      else if (method === 'mobile_money') {
        const momoResponse = await axios.post(
          'https://api.flutterwave.com/v3/charges?type=mobile_money_ghana',
          {
            tx_ref: `TX-${Date.now()}`,
            amount,
            currency: 'GHS',
            email: 'customer@example.com',
            phone_number: phoneNumber,
            fullname: 'Customer',
            redirect_url: 'https://your-frontend-url.com/payment-success',
          },
          {
            headers: {
              Authorization: `Bearer ${FLW_SECRET}`,
              'Content-Type': 'application/json',
            },
          }
        );

        paymentResponse = {
          status: momoResponse.data.status,
          message: momoResponse.data.message,
          data: momoResponse.data.data,
        };
      }

      //  4. Bank Transfer
      else if (method === 'bank_transfer') {
        paymentResponse = {
          status: 'pending',
          message: 'Bank transfer selected. Awaiting manual confirmation.',
        };
      }

      else {
        return res.status(400).json({ message: 'Invalid payment method' });
      }

      res.json({
        success: true,
        method,
        orderId,
        payment: paymentResponse,
      });

    } catch (error) {
      console.error('Payment Error:', error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

module.exports = paymentController;
