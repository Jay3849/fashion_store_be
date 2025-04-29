const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/loginModel");
const { ReportModules } = require("../utills/enum");
const OrderModel = require("../models/orderModel");

const Report = async (req, res) => {
  try {
    const { module } = req.params;
    const { startDate, endDate } = req.query;

    let response = {};
    switch (module) {
      case ReportModules.ORDER:
        response = await getOrderReports(startDate, endDate);
        break;
      case ReportModules.PRODUCT:
        response = await getProductReports(startDate, endDate);
        break;
      case ReportModules.TOTALREVENUE:
        response = await TotalRevenue(startDate, endDate);
        break;
      default:
        throw Error("Module not found");
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error?.message || "orders not available" });
  }
};

const getOrderReports = async (startDate, endDate) => {
  const aggregation = [];
  if (startDate && endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    endDate.setUTCHours(23, 59, 59, 999);
    // start = start.toISOString();
    // end = end.toISOString();
    console.log(startDate, endDate);
    aggregation.push({
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
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

  const result = await OrderModel.aggregate(aggregation).exec();
  return result?.length ? result[0] : null;
};
// const getProductReports = async (startDate, endDate) => {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   end.setHours(23, 59, 59, 999);

//   if (startDate && endDate) {
//     aggregation.push({
//       $match: {
//         createdAt: { $gte: start, $lte: end },
//       },
//     });
//   }

//   const aggregation = [
//     {
//       $unwind: "$items",
//     },
//     {
//       $group: {
//         _id: "$items.productId",
//         totalQuantity: { $sum: "$items.quantity" },
//       },
//     },
//     {
//       $lookup: {
//         from: "products",
//         localField: "_id",
//         foreignField: "_id",
//         as: "productDetails",
//       },
//     },
//     {
//       $unwind: "$productDetails",
//     },
//     {
//       $project: {
//         _id: 0,
//         productId: "$_id",
//         productName: "$productDetails.name",
//         totalQuantity: 1,
//       },
//     },

//     {
//       $match: {
//         totalQuantity: { $gt: 0 },
//       },
//     },
//     {
//       $sort: {
//         totalQuantity: -1,
//       },
//     },
//   ];
//   return await OrderModel.aggregate(aggregation).exec();
// };

const getProductReports = async (startDate, endDate) => {
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

  aggregation.push(
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.productId",
        totalAmount: { $sum: "$totalAmount" },
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
      $lookup: {
        from: "categorys",
        localField: "productDetails.categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: "$_id",
        name: "$productDetails.name",
        design: "$productDetails.design",
        image: "$productDetails.image",
        price: "$productDetails.price",
        totalAmount: "$totalAmount",
        category: "$category",
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
    }
  );

  return await OrderModel.aggregate(aggregation).exec();
};

const TotalRevenue = async (startDate, endDate) => {
  const matchStage = {
    razorpay_payment_id: { $exists: true, $ne: null },
  };
  if (startDate && endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    endDate.setUTCHours(23, 59, 59, 999);
    matchStage.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  const aggregation = [
    {
      $match: matchStage,
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        totalPaidOrders: { $sum: 1 },
      },
    },
  ];

  let result = await OrderModel.aggregate(aggregation).exec();
  return result?.length ? result[0] : null;
};

module.exports = {
  Report,
};
