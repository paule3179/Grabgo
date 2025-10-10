const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all categories
router.get('/', (req, res) => {
  foodController.getCategories()
    .then(data => {
      res.json({data });
    })
    .catch(error => {
      res.status(500).json({message: error.message });
    });
});

// Get category by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  foodController.getCategoryById(id)
    .then(data => {
      res.json({data });
    })
    .catch(error => {
      if (error.message === 'Category not found') {
        res.status(404).json({message: error.message });
      } else {
        res.status(500).json({message: error.message });
      }
    });
});

// Get items by category id
router.get('/:id/items', (req, res) => {
  const { id } = req.params;
    foodController.getItemsByCategoryId(id)
    .then(data => {
        res.json({ data });
    })
    .catch(error => {
        if (error.message === 'Category not found') {
            res.status(404).json({message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    });
});
 
// Create a new category
router.post('/', (req, res) => {
  const categoryData = req.body;
  foodController.createCategory(categoryData)
    .then(data => {
      res.status(201).json({ data });
    })
    .catch(error => {
      res.status(500).json({message: error.message });
    });
});

//post request to add item to a category
router.post('/:id/items', (req, res) => {
  const { id } = req.params;
  const itemData = req.body;
  foodController.addItemToCategory(id, itemData)
    .then(data => {
      res.status(201).json({data });
    })
    .catch(error => {
      if (error.message === 'Category not found') {
        res.status(404).json({message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
      
    });
});

 

module.exports = router;
