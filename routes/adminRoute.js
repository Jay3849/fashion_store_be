const { Router } = require("express");

const { allUser } = require("../controllers/adminUserController");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/adminController");
const { getAllOrders } = require("../controllers/adminOrdersController");

const AdminRouter = Router();

AdminRouter.get("/products", getProducts);
AdminRouter.post("/products", addProduct);
AdminRouter.delete("/products/:id", deleteProduct);
AdminRouter.put("/products/:id", updateProduct);

AdminRouter.get("/users", allUser);
AdminRouter.get("/orders", getAllOrders);

module.exports = {
  AdminRouter,
};
