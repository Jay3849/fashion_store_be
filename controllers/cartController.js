const CartModel = require("../models/cartModel");
const cartModel = require("../models/cartModel");
const { cartValidator } = require("../validators/cartValidator");

const addToCart = async (req, res) => {
  try {
    const cartValidatedData = await cartValidator(req.body);
    const existingCart = await CartModel.findOne({ userId: req.user._id });
    let response;
    if (existingCart) {
      response = await CartModel.findOne({ userId: req.user._id });
      response.items.push(...cartValidatedData);
      await response.save();
    } else {
      const payload = {
        userId: req.user._id,
        items: cartValidatedData,
      };
      const cartData = new CartModel(payload);
      await cartData.save();
      response = cartData;
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
};

module.exports = {
  addToCart,
};
