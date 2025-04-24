const ProductModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel")


const getAll = async (req, res) => {
  try {
    const { q } = req.query;
    const aggregation = [];

    if (q) {
      aggregation.push({
        $match: {
          $or: [
            { name: { $regex: q, $options: "i" } }
          ]
        }
      });
    }
    aggregation.push({
      $sort: { createdAt: -1 }
    });

    const getall = await categoryModel.aggregate(aggregation);

    if (!getall || getall.length === 0) {
      throw new Error("No categories found...");
    }

    res.status(200).json({
      success: true,
      data: getall
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: error?.message });
  }
};


const getCategories = async (req, res) => {
  // get all distinct category from product modal and return as response

  const categories = await ProductModel.distinct("category");
  return res.status(200).json(categories);
  //   ['T-shrit','Shirt','Pant'] sample data
};

module.exports = {
  getCategories,
  getAll
  
};
