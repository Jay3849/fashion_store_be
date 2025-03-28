const { Router } = require("express");
const { orderdata } = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/auth");

const orderRouter = Router();

orderRouter.post("/orders/:cartId", orderdata);

module.exports = orderRouter;
