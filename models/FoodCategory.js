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
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
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
    }
  }]
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
