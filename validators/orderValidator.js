const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");

const validatedOrderData = async (data) => {
  let { cartId, address } = data;

  console.log("sdcsdcscsdcdscd", cartId);
  const requiredFields = [
    "fullName",
    "phoneNumber",
    "street",
    "city",
    "state",
    "zipCode",
    "country",
  ];
  if (!requiredFields) {
    throw Error("please Enter a require details");
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(address.phoneNumber)) {
    return res
      .status(400)
      .json({ error: "Invalid phone number! Must be 10 digits." });
  }

  const zipRegex = /^[0-9]+$/;
  if (!zipRegex.test(address.zipCode)) {
    return res
      .status(400)
      .json({ error: "Invalid zip code! Must contain only numbers." });
  }

  if (!cartId) {
    throw Error("Cart ID is required to place an order");
  }
  const cartExists = await CartModel.exists({ _id: cartId }).exec();
  console.log("ksksj", cartExists);

  if (!cartExists) {
    throw new Error(
      "Cart not found. Please add products to your cart before ordering."
    );
  }
};

module.exports = { validatedOrderData };
