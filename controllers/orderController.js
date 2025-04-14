const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");
const { validatedOrderData } = require("../validators/orderValidator");

const orderdata = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { address } = req.body;
    await validatedOrderData({ cartId, address });
    const cartData = await CartModel.findOne({ _id: cartId }).populate(
      "items.productId"
    );

    if (!cartData) {
      throw Error("not found");
    }
    let totalAmount = 0;
    const payload = {
      userId: cartData.userId,
      items: [],
      address,
      totalAmount: 0,
      orderedAt: new Date(),
    };
    payload.items = cartData.items
      .filter((item) => item?.productId)
      .map((item) => {
        let dd = {
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price * item.quantity,
          size: item.size,
        };

        totalAmount += dd.price;
        return dd;
      });
    payload.totalAmount = totalAmount;
    const order = new OrderModel(payload);
    await order.save();
    await cartData.deleteOne();
    console.log(order);
    // return res.status(201).json(order);
    return res.status(201).json(order.toObject({ versionKey: false }));
  } catch (error) {
    res.status(400).json({ msg: error?.message });
  }
};

const getone = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(orderId);

    if (!orderId) return res.status(400).json({ msg: "Order ID is required" });

    const getOne = await OrderModel.findById(orderId)
      .populate("userId")
      .populate("items.productId");

    if (!getOne) return res.status(404).json({ msg: "Order not found" });

    res.status(200).json(getOne);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ msg: error?.message || "Order not available" });
  }
};

const getAll = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const getAll = await OrderModel.find({ userId })
      .populate("userId")
      .populate("items.productId");

    if (!getAll) return res.status(404).json({ msg: "Order not found" });

    res.status(200).json(getAll);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ msg: error?.message || "Order not available" });
  }
};

const orderDelete = async (req, res) => {
  try {
    const { orderId } = req.params;

    const cancleOrder = await OrderModel.deleteOne({ _id: orderId });
    if (!cancleOrder) {
      throw Error("order not exists...");
    }
    res.status(200).json(cancleOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error?.message || "Error deleting order" });
  }
};

module.exports = {
  orderdata,
  getone,
  getAll,
  orderDelete,
};
