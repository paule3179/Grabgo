const mongoose = require('mongoose');

// Product schema for food items
const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price_cedis: {
    type: Number,
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  sellerId: {
    type: Number,
    required: true
  },
});

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;

