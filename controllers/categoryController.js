const ProductModel = require("../models/productModel");





const getCategories = async (req, res) => {
  // get all distinct category from product modal and return as response

  const categories = await ProductModel.distinct("category");
  return res.status(200).json(categories);
  //   ['T-shrit','Shirt','Pant'] sample data
};

module.exports = {
  getCategories,
  
};
