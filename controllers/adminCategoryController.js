const productModel = require("../models/productModel");

const category = async (req, res) => {
  const category = await productModel.distinct("category");
  return res.status(200).json(category);
};

module.exports = category;
