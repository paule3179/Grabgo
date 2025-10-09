const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all items
router.get('/', (req, res) => {
  foodController.getItems()
    .then(data => {
      res.json({ success: true, data });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: error.message });
    });
});

// Get item by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  foodController.getItemById(id)
    .then(data => {
      res.json({ success: true, data });
    })
    .catch(error => {
      if (error.message === 'Item not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    });
});

module.exports = router;
