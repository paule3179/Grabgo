const mongoose = require('mongoose');

// Category schema
const categorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  categoryName: {
    type: String,
    required: true
  },

  emoji: {
    type: String,
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodItem'
  }]
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
