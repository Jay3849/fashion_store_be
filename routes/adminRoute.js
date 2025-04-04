const { Router } = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
} = require("../controllers/adminController");

const AdminRouter = Router();

AdminRouter.get("/products", getProducts);
AdminRouter.post("/products", addProduct);
AdminRouter.delete("/products/:id", deleteProduct);

module.exports = {
  AdminRouter,
};
