const mongoose = require("mongoose");
const { TransectionStatus } = require("../utills/enum");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity can not be less than 1."],
          default: 1,
        },

        price: {
          type: Number,
          required: true,
        },

        size: { type: String },
      },
    ],
    // address: {
    //   fullName: { type: String, required: true },
    //   phoneNumber: { type: String, required: true },
    //   street: { type: String, required: true },
    //   city: { type: String, required: true },
    //   state: { type: String, required: true },
    //   zipCode: { type: String, required: true },
    //   country: { type: String, required: true, default: "India" },
    // },
      addressId: {
        ref:"Address",
          required: true,
          type: mongoose.Schema.Types.ObjectId,
    
        },

    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount cannot be negative."],
      set: (value) => parseFloat(value),
    },

    status: {
      type: String,
      enum: [TransectionStatus.FAILED, TransectionStatus.SUCCESS],
    },

    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
