const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const Category = require('../models/FoodCategory');

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

// Update item in category
router.put('/:categoryId/items/:itemId', async (req, res) => {
  try {
    const { categoryId, itemId } = req.params;
    const updateData = req.body; 

    const updatedCategory = await Category.findOneAndUpdate(
      {
        id: categoryId,
        "items._id": itemId
      },
      
       {
        $set: { "items.$.image": updateData.image}  
      },
      {
        new: true,
        runValidators: true
      }
    );

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

 

module.exports = router;
