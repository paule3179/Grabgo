const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 8084;

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

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const categoryRoutes = require('./routes/categories');
app.use('/api/categories', categoryRoutes);

const foodItemRoutes = require('./routes/foodItems');
app.use('/api/foodItems', foodItemRoutes);

const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

const restaurantRoutes = require('./routes/restaurants');
app.use('/api/restaurants', restaurantRoutes);

app.use('/api/users', userRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'API test endpoint' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mobile API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
