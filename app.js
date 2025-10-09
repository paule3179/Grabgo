const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const multer = require('multer');
 

const app = express();

// Connect to MongoDB

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 8082;

//multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Routes
const routes = require('./routes');
app.use('/api', routes);

const foodRoutes = require('./routes/food');
app.use('/api/food', foodRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mobile API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
