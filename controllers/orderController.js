const Order = require('../models/order');

const orderController = {
  createOrder: async (orderData) => {
    const order = new Order(orderData);
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
