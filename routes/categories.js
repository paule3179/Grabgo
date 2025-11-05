const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const Category = require('../models/FoodCategory');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all categories
router.get('/', (req, res) => {
  categoriesController.getCategories()
    .then(data => {
      res.json({data });
    })
    .catch(error => {
      res.status(500).json({message: error.message });
    });
});

// Get all categories
router.get('/', async (req, res) => {
  categoriesController.getCategories()
    .then(data => res.json({ data }))
    .catch(error => res.status(500).json({ message: error.message }));
});

// Move ABOVE any routes with :id
router.get('/count', async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    res.json({ success: true, count: totalCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get category by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  categoriesController.getCategoryById(id)
    .then(data => res.json({ data }))
    .catch(error => {
      if (error.message === 'Category not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});


//post request to add item to a category
router.post('/:id/items', authenticateToken, requireAdmin, (req, res) => {
  const { id } = req.params;
  const { itemId } = req.body;
  categoriesController.addItemToCategory(id, itemId)
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

// Update item in category
router.put('/:categoryId/items/:itemId', async (req, res) => {
  try {
    const { categoryId, itemId } = req.params;
    const updateData = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $set: { "items.$": itemId } },
      { new: true, runValidators: true }
    ).populate('items');

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category or item not found' });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: updatedCategory
    });

  } catch (error) {
    if (error.message.includes('not found')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});


// delete category by id
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


 

module.exports = router;
