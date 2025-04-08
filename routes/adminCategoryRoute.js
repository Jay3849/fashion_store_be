const { Router } = require("express");
const category = require("../controllers/adminCategoryController");

const adminCategoryRouter = Router();

adminCategoryRouter.get("/category", category);

module.exports = {
  adminCategoryRouter,
};
