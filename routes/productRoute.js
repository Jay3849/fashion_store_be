const { Router } = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getOne,
  getall,
} = require("../controllers/productController");
const { authMiddleware } = require("../middleware/auth");

const productRoute = Router();

productRoute.get("/product", getall);
productRoute.get("/product/:id", getOne);
productRoute.post("/product", authMiddleware, createProduct);
productRoute.put("/product/:id", authMiddleware, updateProduct);
productRoute.delete("/product/:id", authMiddleware, deleteProduct);

module.exports = productRoute;
