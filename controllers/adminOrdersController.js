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
          let: { productId: "$items.productId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$productId"] },
              },
            },
            {
              $lookup: {
                from: "categorys",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
              },
            },
            {
              $unwind: {
                path: "$category",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
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
      { $sort: { createdAt: -1 } },
    ]);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: error?.message || "Error fetching orders" });
  }
};

const getOne = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);

    if (!orderId) return res.status(400).json({ msg: "Order ID is required" });

    const getOne = await orderModel
      .findById(orderId)
      .populate("userId")
      .populate("items.productId")
      .populate("addressId")
      .populate({
        path: "items.productId",
        populate: {
          path: "categoryId",
        },
      });

    if (!getOne) return res.status(404).json({ msg: "Order not found" });

    res.status(200).json(getOne);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ msg: error?.message || "Order not available" });
  }
};

module.exports = {
  getAllOrders,
  getOne,
};
