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

productRoute.post("/product", createProduct);
productRoute.get("/product", getall);
productRoute.get("/product/:id", getOne);
productRoute.put("/product/:id", updateProduct);
productRoute.delete("/product/:id", deleteProduct);

module.exports = productRoute;
