const mongoose = require("mongoose");
const { TransectionStatus } = require("../utills/enum");

const transectionSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      ref: "orders",
    },

    razorpayOrderId: {
      type: String,
    },

    paymentId: {
      type: String,
    },

    status: {
      enum: [TransectionStatus.FAILED, TransectionStatus.SUCCESS],
    },

    userId: {
      type: String,
      ref: "users",
    },
  },
  { versionKey: false }
);
const transectionModel = mongoose.model("transactions", transectionSchema);
module.exports = {
  transectionModel,
};
