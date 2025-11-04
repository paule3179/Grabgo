const express = require('express');
const router = express.Router();
const foodItemsController = require('../controllers/foodItemsController');
const { authenticateToken, requireAdmin, requireVendor } = require('../middleware/auth');

// Create a new food item
router.post('/', (req, res) => {
  const itemData = req.body;
  foodItemsController.createItem(itemData)
    .then(data => {
      res.status(201).json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get all food items
router.get('/', (req, res) => {
  foodItemsController.getItems()
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get food item by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  foodItemsController.getItemById(id)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Item not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Get food items by seller id
router.get('/seller/:sellerId', (req, res) => {
  const { sellerId } = req.params;
  foodItemsController.getItemsBySellerId(sellerId)

    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Update food item by id
router.put('/:id', authenticateToken, requireVendor, (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  foodItemsController.updateItem(id, updateData)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Item not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Delete food item by id
router.delete('/:id', authenticateToken, requireVendor, (req, res) => {
  const { id } = req.params;
  foodItemsController.deleteItem(id)
    .then(() => {
      res.json({ message: 'Item deleted successfully' });
    })
    .catch(error => {
      if (error.message === 'Item not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});
module.exports = router;
