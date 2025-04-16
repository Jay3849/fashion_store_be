const transectionValidData = require("../validators/transectionValidator");
const orderModel = require("../models/orderModel");
const { transectionModel } = require("../models/transectionModel");
const { TransectionStatus } = require("../utills/enum");

const transectionData = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentId, razorpaySignature } = req.body;

    await transectionValidData({ orderId, paymentId });

    const data = await orderModel.findOne({ _id: orderId });
    const payload = {
      orderId: data._id,
      razorpayOrderId: data.razorpay_order_id,
      paymentId: paymentId,
      userId: data.userId,
      status: TransectionStatus.SUCCESS,
    };
    const transectionData = new transectionModel(payload);
    await transectionData.save();
  } catch (error) {
    res.status(400).json({ msg: error?.message || "Invalid Data" });
  }
};

module.exports = {
  transectionData,
};
