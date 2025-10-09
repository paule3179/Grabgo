// Configuration settings
const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  // Add database config, API keys, etc. here
  database: {
    // Example: MongoDB or SQL config
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key'
  }
};

module.exports = config;
