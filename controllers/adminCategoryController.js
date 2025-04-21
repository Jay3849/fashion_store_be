const categoryModel = require("../models/categoryModel");
const categoryData = require("../validators/categoryValidator");

// const category = async (req, res) => {
//   const category = await productModel.distinct("category");
//   return res.status(200).json(category);
// };

const createCategory = async (req, res) => {
  try {
    const validData = await categoryData({
      ...req.body,
    });

    const category = new categoryModel(validData);
    await category.save();
    res.status(201).json({ msg: "category created successfully...", category });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};




const getAll = async (req, res) => {
  try {
    const categories = await categoryModel.find().sort({ name: 1 }); 
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch categories", error: error.message });
  }
};
module.exports = { createCategory,getAll };
