const Category = require('../models/FoodCategory');
const FoodItem = require('../models/FoodItem');

const foodController = {
  createCategory: async (categoryData) => {
    const category = new Category(categoryData);
    await category.save();
    return category;
  },
  createItem: async (itemData) => {
    const item = new FoodItem(itemData);
    await item.save();
    return item;
  },
  getCategories: async () => {
    return await Category.find();
  },

  getCategoryById: async (id) => {
    const category = await Category.findOne({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  },

  getItemsByCategoryId: async (id) => {
    const category = await Category.findOne({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    return category.items;
  },

  addItemToCategory: async (id, itemData) => {
    const category = await Category.findOneAndUpdate(
      { id },
      { $push: { items: itemData } },
      { new: true }
    );
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
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
  },

  updateItem: async (id, updateData) => {
    const item = await FoodItem.findByIdAndUpdate(id, updateData, { new: true });
    if (!item) {
      throw new Error('Item not found');
    }
    return item;
  }
};

module.exports = foodController;
