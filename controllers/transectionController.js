const transectionValidData = require("../validators/transectionValidator");
const orderModel = require("../models/orderModel");
const { TransectionStatus } = require("../utills/enum");

const transectionData = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentId, razorpaySignature } = req.body;
    await transectionValidData({ orderId, paymentId });

    const data = await orderModel.findByIdAndUpdate(
      orderId,
      {
        razorpay_payment_id: paymentId,
        status:TransectionStatus.SUCCESS
      },
      { new: true }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error?.message || "Invalid Data" });
  }
};






module.exports = {
  transectionData,
};
