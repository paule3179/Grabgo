const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, requireAdmin, requireModerator } = require('../middleware/auth');

// Get current user profile
router.get('/profile', authenticateToken, authController.getProfile);

// Refresh JWT token
router.post('/refresh', authenticateToken, authController.refreshToken);

// Update user role (admin only)
router.put('/users/:userId/role', authenticateToken, requireAdmin, authController.updateUserRole);

// Get all users with roles (admin only)
router.get('/users', authenticateToken, requireAdmin, authController.getUsersWithRoles);

// Deactivate user (admin/moderator only)
router.put('/users/:userId/deactivate', authenticateToken, requireModerator, authController.deactivateUser);

// Activate user (admin/moderator only)
router.put('/users/:userId/activate', authenticateToken, requireModerator, authController.activateUser);

module.exports = router;
