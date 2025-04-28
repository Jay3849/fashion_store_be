const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/loginModel");
const { ReportModules } = require("../utills/enum");
const OrderModel = require("../models/orderModel");

const Report = async (req, res) => {
  try {
    const { module } = req.params;

    let response = {};
    switch (module) {
      case ReportModules.ORDER:
        response = await getOrderReports();
        break;
      case ReportModules.PRODUCT:
        response = await getProductReports();
        break;
      default:
        throw Error("Module not found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error?.message || "orders not available" });
  }
};

const getOrderReports = async (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  const aggregation = [];
  if (startDate && endDate) {
    aggregation.push({
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    });
  }

  aggregation.push({
    $group: {
      _id: null,
      totalOrders: { $sum: 1 },
      totalAmount: { $sum: "$totalAmount" },
    },
  });

  return await OrderModel.aggregate(aggregation).exec();
};
const getProductReports = async () => {
  const aggregation = [
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.productId",
        totalQuantity: { $sum: "$items.quantity" },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $project: {
        _id: 0,
        productId: "$_id",
        productName: "$productDetails.name",
        totalQuantity: 1,
      },
    },

    {
      $match: {
        totalQuantity: { $gt: 0 },
      },
    },
    {
      $sort: {
        totalQuantity: -1,
      },
    },
  ];
  return await OrderModel.aggregate(aggregation).exec();
};

module.exports = {
  Report,
};
