const { Router } = require("express");
const { addToCart } = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/auth");
const cart = require;

const CartRouter = Router();

CartRouter.post("/cart", authMiddleware, addToCart);
module.exports = CartRouter;
