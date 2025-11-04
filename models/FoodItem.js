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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  image: {
    type: String
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;

