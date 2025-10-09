const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all categories
router.get('/', (req, res) => {
  foodController.getCategories()
    .then(data => {
      res.json({ success: true, data });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: error.message });
    });
});

// Get category by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  foodController.getCategoryById(id)
    .then(data => {
      res.json({ success: true, data });
    })
    .catch(error => {
      if (error.message === 'Category not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    });
});

// Get items by category id
router.get('/:id/items', (req, res) => {
  const { id } = req.params;
    foodController.getItemsByCategoryId(id)
    .then(data => {
        res.json({ success: true, data });
    })
    .catch(error => {
        if (error.message === 'Category not found') {
            res.status(404).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// Add other category-related routes here
router.post('/', (req, res) => {
  const categoryData = req.body;
  foodController.createCategory(categoryData)
    .then(data => {
      res.status(201).json({ success: true, data });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: error.message });
    });
});

//post request to add item to a category
router.post('/:id/items', (req, res) => {
  const { id } = req.params;
  const itemData = req.body;
  foodController.addItemToCategory(id, itemData)
    .then(data => {
      res.status(201).json({ success: true, data });
    })
    .catch(error => {
      if (error.message === 'Category not found') {
        res.status(404).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
      
    });
});

 

module.exports = router;
