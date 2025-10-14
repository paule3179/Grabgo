const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create a new order
router.post('/', (req, res) => {
  const orderData = req.body;
  orderController.createOrder(orderData)
    .then(data => {
      res.status(201).json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get all orders
router.get('/', (req, res) => {
  orderController.getOrders()
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get order by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  orderController.getOrderById(id)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Order not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Update order by id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  orderController.updateOrder(id, updateData)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Order not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Delete order by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  orderController.deleteOrder(id)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Order not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Get orders by user
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  orderController.getOrdersByUser(userId)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get orders by date
router.get('/date/:date', (req, res) => {
  const { date } = req.params;
  orderController.getOrdersByDate(date)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
