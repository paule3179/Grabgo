// models/Restaurant.js

const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    //  Information
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true },
    food_type: { type: String }, // e.g., "Fast Food • Chicken • Burgers"
    description: { type: String },
    
    // Images and Media
    image_url: { type: String },
    banner_images: [{ type: String }], // Array of strings for multiple banners
    
    // Location and Contact
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    phone: { type: String },
    email: { type: String },
    
    // Delivery and Operations
    distance: { type: Number }, // Distance in km/miles
    average_delivery_time: { type: String },
    delivery_fee: { type: Number, default: 0.0 },
    min_order: { type: Number, default: 0.0 },
    opening_hours: { type: String },
    is_open: { type: Boolean, default: true },
    payment_methods: [{ type: String }], // Array of accepted payment methods
    
    // Rating and Reviews
    rating: { type: Number, min: 0, max: 5 },
    total_reviews: { type: Number, default: 0 },

    // Social Media (Nested Object)
    socials: {
        instagram: { type: String },
        facebook: { type: String }
    },
 

}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
