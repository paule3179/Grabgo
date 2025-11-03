const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authenticateToken, requireAdmin, requireVendor } = require('../middleware/auth');

// for Creating a new restaurant
router.post('/', authenticateToken, requireVendor, (req, res) => {
  const restaurantData = req.body;
  restaurantController.createRestaurant(restaurantData)
    .then(data => {
      res.status(201).json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// for geting all restaurants
router.get('/', (req, res) => {
  restaurantController.getRestaurants()
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get restaurant by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  restaurantController.getRestaurantById(id)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Restaurant not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Update restaurant by id
router.put('/:id', authenticateToken, requireVendor, (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  restaurantController.updateRestaurant(id, updateData)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      if (error.message === 'Restaurant not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Delete restaurant by id
router.delete('/:id', authenticateToken, requireVendor, (req, res) => {
  const { id } = req.params;
  restaurantController.deleteRestaurant(id)
    .then(data => {
      res.json({ message: 'Restaurant deleted successfully', data });
    })
    .catch(error => {
      if (error.message === 'Restaurant not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    });
});

// Get restaurants by city
router.get('/city/:city', (req, res) => {
  const { city } = req.params;
  restaurantController.getRestaurantsByCity(city)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Get restaurants by food type
router.get('/food-type/:foodType', (req, res) => {
  const { foodType } = req.params;
  restaurantController.getRestaurantsByFoodType(foodType)
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
