const mongoose = require('mongoose');
const Category = require('../models/FoodCategory');
const FoodItem = require('../models/FoodItem');
const User = require('../models/user');

const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/grabgo';

const seedData = async () => {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Category.deleteMany({});
    await FoodItem.deleteMany({});
    await User.deleteMany({});

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

    // Create sample users
    const users = [
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'password123'
      },
      {
        username: 'jane_smith',
        email: 'jane@example.com',
        password: 'password123'
      }
    ];

    const savedUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      savedUsers.push(user);
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
        price_cedis: 12.0,
        sellerName: 'Samira Foods',
        sellerId: 1,
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
        price_cedis: 10.0,
        sellerName: 'Samira Foods',
        sellerId: 1,
        countInStock: 30,
        rating: 4.0,
        numReviews: 8,
        isFeatured: false
      }
    ];

    const savedItems = [];
    for (const itemData of items) {
      const item = new FoodItem(itemData);
      await item.save();
      savedItems.push(item);
    }

    // Create sample orders
    const Order = require('../models/order');
    await Order.deleteMany({});

    const orders = [
      {
        user: savedUsers[0]._id,
        foodItem: savedItems[0]._id,
        date: new Date('2023-10-15'),
        time: '12:00',
        quantity: 2,
        status: 'confirmed',
        notes: 'Pickup at noon'
      },
      {
        user: savedUsers[1]._id,
        foodItem: savedItems[1]._id,
        date: new Date('2023-10-16'),
        time: '18:00',
        quantity: 1,
        status: 'pending',
        notes: 'Delivery please'
      }
    ];

    for (const orderData of orders) {
      const order = new Order(orderData);
      await order.save();
    }

  
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
