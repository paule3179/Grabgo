const FoodItem = require('../models/FoodItem');

const foodItemsController = {
  createItem: async (itemData) => {
    const item = new FoodItem(itemData);
    await item.save();
    return item;
  },

  updateItem: async (id, updateData) => {
    const item = await FoodItem.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  },

  getItemsBySellerId: async (sellerId) => {
    return await FoodItem.find({ sellerId });
  },

  deleteItem: async (id) => {
    const item = await FoodItem.findByIdAndDelete(id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  },

  getItems: async () => {
    return await FoodItem.find();
  },

  getItemById: async (id) => {
    const item = await FoodItem.findById(id);
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
};

module.exports = foodItemsController;
