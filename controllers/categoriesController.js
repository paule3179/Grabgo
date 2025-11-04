const Category = require('../models/FoodCategory');

const categoriesController = {
  createCategory: async (categoryData) => {
    try {
      console.log('Creating category with data:', categoryData);
      const category = new Category(categoryData);
      const savedCategory = await category.save();
      console.log('Category saved successfully:', savedCategory);
      return savedCategory;
    } catch (error) {
      console.error('Error saving category:', error.message);
      throw error;
    }
  },

  getCategories: async () => {
    return await Category.find().populate('items');
  },

  getCategoryById: async (id) => {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  },

  getItemsByCategoryId: async (id) => {
    const category = await Category.findById(id).populate('items');
    if (!category) {
      throw new Error('Category not found');
    }
    return category.items;
  },

  addItemToCategory: async (id, itemId) => {
    const category = await Category.findByIdAndUpdate(
      id,
      { $push: { items: itemId } },
      { new: true }
    ).populate('items');
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
};

module.exports = categoriesController;
