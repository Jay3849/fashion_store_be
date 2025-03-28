const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
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
  address: {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
  },

  totalAmount: {
    type: Number,
    required: true,
    min: [0, "Total amount cannot be negative."],
    set: (value) => parseFloat(value),
  },
});

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = OrderModel;
