const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  orderdata,
  getone,
  getAll,
  orderDelete,
} = require("../controllers/orderController");

const orderRouter = Router();

orderRouter.post("/orders/:cartId", authMiddleware, orderdata);
orderRouter.get("/orders/:orderId", authMiddleware, getone);
orderRouter.get("/orders", authMiddleware, getAll);
orderRouter.delete("/orders/:orderId", authMiddleware, orderDelete);

module.exports = orderRouter;
