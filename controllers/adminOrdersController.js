const orderModel = require("../models/orderModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          "user.password": 0,
        },
      },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $addFields: {
          "items.product": "$product",
        },
      },
      {
        $project: {
          product: 0,
        },
      },
      {
        $group: {
          _id: "$_id",
          doc: { $first: "$$ROOT" },
          items: {
            $push: {
              product: "$items.product",
              quantity: "$items.quantity",
              price: "$items.price",
              size: "$items.size",
            },
          },
        },
      },
      {
        $addFields: {
          "doc.items": "$items",
        },
      },
      {
        $replaceRoot: {
          newRoot: "$doc",
        },
      },
    ]);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: error?.message || "Error fetching orders" });
  }
};

module.exports = {
  getAllOrders,
};
