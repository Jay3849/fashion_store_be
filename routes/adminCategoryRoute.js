const { Router } = require("express");

const {createCategory, getAll, updateCategory, deleteCategory} = require('../controllers/adminCategoryController')
const adminCategoryRouter = Router();

adminCategoryRouter.post("/category",createCategory)
adminCategoryRouter.get("/category",getAll)
adminCategoryRouter.post("/category/:id",updateCategory)
adminCategoryRouter.delete("/category/:id",deleteCategory)





module.exports = {
  adminCategoryRouter,
};
