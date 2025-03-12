const { Router } = require("express");
const {
  addToCart,
  getCartProduct,
  cartProductUpdate,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/auth");
const cart = require;

const CartRouter = Router();

CartRouter.post("/cart", authMiddleware, addToCart);
CartRouter.put("/cart/:id", authMiddleware, cartProductUpdate);
CartRouter.get("/cart", authMiddleware, getCartProduct);

module.exports = CartRouter;
