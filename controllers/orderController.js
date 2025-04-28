const shortUUID = require("short-uuid");
const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");
const RazorpayService = require("../services/RazorpayService");
const { validatedOrderData } = require("../validators/orderValidator");
const { default: mongoose } = require("mongoose");

const orderdata = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { cartId } = req.params;
    const { addressId } = req.body;
    await validatedOrderData({ cartId, addressId });
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
      addressId,
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
    const receipt = shortUUID.uuid();

    const rozarpay = new RazorpayService();
    const rozarpayOrder = await rozarpay.createOrder({
      amount: totalAmount * 100,
      currency: "INR",
      receipt,
    });
    order.razorpay_order_id = rozarpayOrder.id;
    await CartModel.findByIdAndUpdate(cartId, { items: [] });


    (await order.save()).populate("userId");
    
    await session.commitTransaction();
    session.endSession();
    return res
      .status(201)
      .json({ order, key_id: process.env.RAZORPAY_TEST_KEY_ID });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ msg: error?.message });
  }
};

const getone = async (req, res) => {
  try {
    const { orderId } = req.params;
    const aggregation=[];
    if (!orderId) return res.status(400).json({ msg: "Order ID is required" });

    const getOne = await OrderModel.findById(orderId)
      .populate("userId")
      .populate("items.productId")
      .populate("addressId");
      // .populate("transaction");

    if (!getOne) return res.status(404).json({ msg: "Order not found" });

    
    aggregation.push(
      {
        $lookup: {
          from: "Address", 
          localField: "addressId",
          foreignField: "_id",
          as: "address"
        }
      },
      {
        $unwind: "$address" 
      },
    )
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
     .sort({ createdAt: -1 })
      .populate("userId")
      .populate("addressId")
      .populate('addressId')
      .populate("items.productId")
      .populate({
        path: "items.productId",
        populate: {
          path: "categoryId"
        }
      })

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
