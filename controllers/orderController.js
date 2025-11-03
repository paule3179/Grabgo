const Order = require('../models/order');
const FoodItem = require('../models/FoodItem');

const orderController = {
  createOrder: async (orderData) => {
    const { foodItem, quantity = 1, selectedAddOns = [] } = orderData;

    // Fetch the food item to get base price and validate add-ons
    const item = await FoodItem.findById(foodItem);
    if (!item) {
      throw new Error('Food item not found');
    }

    // Calculate total price
    let totalPrice = item.price_cedis * quantity;

    // Validate and add add-on prices
    const validatedAddOns = [];
    for (const addOn of selectedAddOns) {
      const itemAddOn = item.addOns.id(addOn.addOnId);
      if (!itemAddOn) {
        throw new Error(`Invalid add-on: ${addOn.name}`);
      }
      validatedAddOns.push({
        addOnId: itemAddOn._id,
        name: itemAddOn.name,
        price: itemAddOn.price
      });
      totalPrice += itemAddOn.price * quantity; // Add-ons are per item
    }

    // Create order with calculated total
    const order = new Order({
      ...orderData,
      selectedAddOns: validatedAddOns,
      totalPrice
    });

    await order.save();
    return order;
  },

  getOrders: async () => {
    return await Order.find().populate('user').populate('foodItem');
  },

  getOrderById: async (id) => {
    const order = await Order.findById(id).populate('user').populate('foodItem');
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },

  updateOrder: async (id, updateData) => {
    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },

  deleteOrder: async (id) => {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  },

  getOrdersByUser: async (userId) => {
    return await Order.find({ user: userId }).populate('foodItem');
  },

  getOrdersByDate: async (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return await Order.find({ date: { $gte: start, $lte: end } }).populate('user').populate('foodItem');
  }
};

module.exports = orderController;
