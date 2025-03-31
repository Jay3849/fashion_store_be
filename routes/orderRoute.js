const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth");
const { orderdata } = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.post("/orders/:cartId", orderdata);

module.exports = orderRouter;
