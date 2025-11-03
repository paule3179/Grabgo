const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const JWT_SECRET = process.env.JWT_SECRET || config.jwt.secret;

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, permissions } = req.body;

    // Only admins can update roles
    if (req.user.role !== 'admin' && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can update user roles' });
    }

    const allowedRoles = ['user', 'admin', 'moderator', 'vendor'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role, permissions },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users with roles (admin only)
const getUsersWithRoles = async (req, res) => {
  try {
    // Only admins can view all users
    if (req.user.role !== 'admin' && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can view user roles' });
    }

    const users = await User.find().select('username email role permissions isAdmin isActive createdAt');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deactivate user (admin/moderator only)
const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check permissions
    if (req.user.role !== 'admin' && req.user.role !== 'moderator' && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deactivated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Activate user (admin/moderator only)
const activateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check permissions
    if (req.user.role !== 'admin' && req.user.role !== 'moderator' && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User activated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Refresh JWT token
const refreshToken = async (req, res) => {
  try {
    const user = req.user;
    const newToken = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateUserRole,
  getUsersWithRoles,
  deactivateUser,
  activateUser,
  refreshToken
};
