  const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const {
  cartValidator,
  cartUpdateValidator,
} = require("../validators/cartValidator");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const cartValidatedData = await cartValidator(req.body, (userId = _id));
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

const cartProductUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    await cartUpdateValidator({ id, quantity });
    if (!id || !quantity) {
      return res.status(400).json({ msg: "product id and quantity required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid product ID format" });
    }

    const productExists = await ProductModel.findById(id);
    if (!productExists) {
      return res.status(404).json({ msg: "Product not found" });
    }
    let findUserCart = await CartModel.findOne({
      userId: req.user._id,
    });
    if (findUserCart) {
      const findItem = await CartModel.findOne({
        userId: req.user._id,
        "items.productId": id,
      });
      if (!findItem) {
        await CartModel.updateOne({
          userId: req.user._id,
          $push: { items: { productId: id, quantity } },
        });
      } else {
        findUserCart = await CartModel.updateOne(
          { userId: req.user._id, "items.productId": id },
          { $set: { "items.$.quantity": req.body.quantity } }
        );
      }
    } else {
      findUserCart = await CartModel.create({
        userId: req.user._id,
        items: [
          {
            productId: id,
            quantity: req.body.quantity,
          },
        ],
      });
    }

    res.status(200).json(findUserCart);
  } catch (error) {
    console.log(error);
  }
};

const getCartProduct = async (req, res) => {
  try {
    const populatedCart = await CartModel.findOne({ userId: req.user._id })
      .populate("items.productId")
      .populate("userId")
      .exec();

    if (!populatedCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error?.message || "Error fetching cart" });
  }
};

const cartDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await CartModel.findOne({ userId: req.user._id });
    if (!isExist) {
      throw Error("cart does not exists");
    }
    const response = await isExist.updateOne({
      $pull: { items: { productId: id } },
    });
    res.status(200).json({ isExist, msg: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "cart details empty!!!" });
  }
};

module.exports = {
  addToCart,
  getCartProduct,
  cartProductUpdate,
  cartDeleteProduct,
};
