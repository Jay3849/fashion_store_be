const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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

        size: { type: String },
      },
    ],
  },

  {
    timestamps: true,
  }
);
const CartModel = mongoose.model("carts", cartSchema);
module.exports = CartModel;
