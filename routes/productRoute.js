const { Router } = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getOne,
  getall,
} = require("../controllers/productController");
const { authMiddleware, isAdmin } = require("../middleware/auth");

const productRoute = Router();

productRoute.get("/product", getall);
productRoute.get("/product/:id", getOne);
// productRoute.post("/product", authMiddleware, isAdmin, createProduct);
productRoute.put("/product/:id", authMiddleware, isAdmin, updateProduct);
// productRoute.delete("/product/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = productRoute;
  