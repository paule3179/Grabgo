const mongoose = require('mongoose');
const Category = require('../models/FoodCategory');
const FoodItem = require('../models/FoodItem');
const User = require('../models/user');
const Restaurant = require('../models/Restaurant');

const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/grabgo';

const seedData = async () => {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Category.deleteMany({});
    await FoodItem.deleteMany({});
    await User.deleteMany({});
    await Restaurant.deleteMany({});

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

    // Create sample restaurants
    const restaurants = [
      {
        name: 'Mama\'s Kitchen',
        city: 'Accra',
        food_type: 'Ghanaian • Local Cuisine',
        description: 'Authentic Ghanaian dishes made with love and fresh ingredients.',
        image_url: '/images/MamaKitchen.jpg',
        banner_images: ['/images/MamaKitchen_banner1.jpg', '/images/MamaKitchen_banner2.jpg'],
        address: '123 Main Street, Accra',
        latitude: 5.6037,
        longitude: -0.1870,
        phone: '+233501234567',
        email: 'info@mamaskitchen.com',
        distance: 2.5,
        average_delivery_time: '25-35 mins',
        delivery_fee: 5.00,
        min_order: 20.00,
        opening_hours: 'Mon-Sun: 7:00 AM - 10:00 PM',
        is_open: true,
        payment_methods: ['Cash', 'Mobile Money', 'Card'],
        rating: 4.5,
        total_reviews: 128,
        socials: {
          instagram: '@mamaskitchen_gh',
          facebook: 'Mama\'s Kitchen Ghana'
        }
      },
      {
        name: 'Pizza Palace',
        city: 'Accra',
        food_type: 'Italian • Pizza • Fast Food',
        description: 'Wood-fired pizzas with fresh toppings and authentic Italian flavors.',
        image_url: '/images/PizzaPalace.jpg',
        banner_images: ['/images/PizzaPalace_banner1.jpg'],
        address: '456 Pizza Street, Accra',
        latitude: 5.6148,
        longitude: -0.2057,
        phone: '+233507654321',
        email: 'orders@pizzapalace.com',
        distance: 3.2,
        average_delivery_time: '20-30 mins',
        delivery_fee: 3.00,
        min_order: 25.00,
        opening_hours: 'Mon-Sun: 11:00 AM - 11:00 PM',
        is_open: true,
        payment_methods: ['Card', 'Mobile Money'],
        rating: 4.2,
        total_reviews: 95,
        socials: {
          instagram: '@pizzapalace_gh',
          facebook: 'Pizza Palace Accra'
        }
      },
      {
        name: 'Burger Barn',
        city: 'Tema',
        food_type: 'American • Burgers • Fast Food',
        description: 'Juicy burgers, crispy fries, and refreshing drinks.',
        image_url: '/images/BurgerBarn.jpg',
        banner_images: ['/images/BurgerBarn_banner1.jpg', '/images/BurgerBarn_banner2.jpg'],
        address: '789 Burger Avenue, Tema',
        latitude: 5.6698,
        longitude: -0.0166,
        phone: '+233549876543',
        email: 'hello@burgerbarn.com',
        distance: 1.8,
        average_delivery_time: '15-25 mins',
        delivery_fee: 4.00,
        min_order: 15.00,
        opening_hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
        is_open: true,
        payment_methods: ['Cash', 'Mobile Money', 'Card'],
        rating: 4.0,
        total_reviews: 67,
        socials: {
          instagram: '@burgerbarn_gh',
          facebook: 'Burger Barn Tema'
        }
      }
    ];

    const savedRestaurants = [];
    for (const restaurantData of restaurants) {
      const restaurant = new Restaurant(restaurantData);
      await restaurant.save();
      savedRestaurants.push(restaurant);
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

    console.log('Seeding completed successfully!');
    console.log(`Created ${savedRestaurants.length} restaurants, ${savedUsers.length} users, ${savedItems.length} food items, and ${orders.length} orders.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
