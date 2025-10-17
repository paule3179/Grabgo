const Restaurant = require('../models/Restaurant');

const restaurantController = {
  createRestaurant: async (restaurantData) => {
    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();
    return restaurant;
  },

  getRestaurants: async () => {
    return await Restaurant.find();
  },

  getRestaurantById: async (id) => {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant;
  },

  updateRestaurant: async (id, updateData) => {
    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant;
  },

  deleteRestaurant: async (id) => {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant;
  },

  getRestaurantsByCity: async (city) => {
    return await Restaurant.find({ city: new RegExp(city, 'i') });
  },

  getRestaurantsByFoodType: async (foodType) => {
    return await Restaurant.find({ food_type: new RegExp(foodType, 'i') });
  }
};

module.exports = restaurantController;
