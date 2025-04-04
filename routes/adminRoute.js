const { Router } = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/adminController");

const AdminRouter = Router();

AdminRouter.get("/products", getProducts);
AdminRouter.post("/products", addProduct);
AdminRouter.delete("/products/:id", deleteProduct);
AdminRouter.put("/products/:id", updateProduct);

module.exports = {
  AdminRouter,
};
