const { response } = require("express");
const categoryModel = require("../models/categoryModel");
const ProductModel = require("../models/productModel");

const index = async (req, res) => {
  let count = 0;
  const products = await ProductModel.find();
  for (const prd of products) { 
    // let cat =await categoryModel.findOne({ name: prd.category });
    // if (cat) {
    //   prd.categoryId = cat._id;
    // } else {
    //   cat =await categoryModel.create({ name: prd.category });
    //   prd.categoryId = cat._id;
    // }
    //  prd.category=undefined;
    await ProductModel.updateMany({}, { $unset: { category: "" } });
    console.log("Old 'category' field removed from all products.");
    
  }
// ProductModel.collection.update({}, {$unset: {field: 1 }});
  res.status(200).json({
    date: new Date(),
    count,
  });
};

module.exports = {
  index,
};
