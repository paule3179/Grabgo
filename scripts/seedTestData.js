const mongoose = require('mongoose');
const Category = require('../models/FoodCategory');
const FoodItem = require('../models/FoodItem');

const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/grabgo';

const seedData = async () => {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Category.deleteMany({});
    await FoodItem.deleteMany({});

    // Create sample categories
    const categories = [
      {
        id: 'quick_bites',
        categoryName: 'Quick Bites',
        emoji: '🍛',
        items: []
      },
      {
        id: 'breakfast',
        categoryName: 'Breakfast',
        emoji: '🍳',
        items: []
      }
    ];

    for (const cat of categories) {
      const category = new Category(cat);
      await category.save();
    }

    // Create sample food items
    const items = [
      {
        name: 'Meat Pie',
        description: 'Flaky pastry filled with seasoned minced meat, potatoes, and onions.',
        richDescription: 'A popular snack that\'s perfect for a quick bite or on-the-go meal.',
        image: 'sampleOne.jpg',
        images: ['sampleOne.jpg'],
        brand: 'Samira Foods',
        price: 12.0,
        countInStock: 50,
        rating: 4.5,
        numReviews: 10,
        isFeatured: true
      },
      {
        name: 'Spring Roll',
        description: 'Crispy rolls stuffed with a mix of vegetables and meat, lightly fried to golden perfection.',
        richDescription: 'Perfect as a snack or appetizer.',
        image: 'sampleTwo.jpg',
        images: ['sampleTwo.jpg'],
        brand: 'Samira Foods',
        price: 10.0,
        countInStock: 30,
        rating: 4.0,
        numReviews: 8,
        isFeatured: false
      }
    ];

    for (const itemData of items) {
      const item = new FoodItem(itemData);
      await item.save();
    }

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
