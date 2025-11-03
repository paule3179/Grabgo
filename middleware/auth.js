const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/index');

const JWT_SECRET = process.env.JWT_SECRET || config.jwt.secret;

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    try {
      // Fetch user from database to get latest role/permissions
      const user = await User.findById(decoded.id).select('-password');
      if (!user || !user.isActive) {
        return res.status(403).json({ message: 'User not found or inactive' });
      }

      req.user = user; // Attach user to request
      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error during authentication' });
    }
  });
};

// Middleware to check if user has required role
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Middleware to check specific permissions
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Admins have all permissions
    if (req.user.role === 'admin' || req.user.isAdmin) {
      return next();
    }

    // Check specific permission
    if (!req.user.permissions || !req.user.permissions[permission]) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

// Middleware for admin-only access
const requireAdmin = requireRole('admin');

// Middleware for vendor access
const requireVendor = requireRole('admin', 'vendor');

// Middleware for moderator access
const requireModerator = requireRole('admin', 'moderator');

module.exports = {
  authenticateToken,
  requireRole,
  requirePermission,
  requireAdmin,
  requireVendor,
  requireModerator
};
