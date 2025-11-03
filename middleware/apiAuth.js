const jwt = require('jsonwebtoken');
const config = require('../config/index');

const JWT_SECRET = process.env.JWT_SECRET || config.jwt.secret;
const API_KEY = process.env.API_KEY; // Optional API key for external integrations

// Middleware for API key authentication (optional)
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  if (!API_KEY) {
    // If no API key is configured, skip this middleware
    return next();
  }

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Invalid API key' });
  }

  next();
};

// Middleware for optional authentication (allows both JWT and API key)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;

  // If API key is provided and valid, allow access
  if (API_KEY && apiKey === API_KEY) {
    req.authType = 'apiKey';
    return next();
  }

  // If JWT token is provided, verify it
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // Invalid token, but since auth is optional, continue without user
        req.authType = 'none';
        return next();
      }
      req.user = decoded;
      req.authType = 'jwt';
      next();
    });
  } else {
    // No authentication provided
    req.authType = 'none';
    next();
  }
};

module.exports = {
  authenticateApiKey,
  optionalAuth
};
