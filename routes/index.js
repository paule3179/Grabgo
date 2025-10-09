const express = require('express');
const router = express.Router();

// Example route
router.get('/test', (req, res) => {
  res.json({ message: 'API test endpoint' });
});

// Food categories routes
const categoryRoutes = require('./categories');
router.use('/categories', categoryRoutes);

// Food items routes
const itemRoutes = require('./items');
router.use('/items', itemRoutes);

// Import other route modules here
// const userRoutes = require('./users');
// router.use('/users', userRoutes);

module.exports = router;
