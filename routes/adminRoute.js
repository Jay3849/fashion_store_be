const { Router } = require("express");

const { allUser } = require("../controllers/adminUserController");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/adminProductController");
const {
  getAllOrders,
  getOne,
} = require("../controllers/adminOrdersController");
// const { getOne } = require("../controllers/productController");

const AdminRouter = Router();

AdminRouter.get("/products", getProducts);
AdminRouter.post("/products", addProduct);
AdminRouter.delete("/products/:id", deleteProduct);
AdminRouter.put("/products/:id", updateProduct);

AdminRouter.get("/users", allUser);
AdminRouter.get("/orders", getAllOrders);
AdminRouter.get("/orders/:orderId", getOne);

module.exports = {
  AdminRouter,
};
