const { Router } = require("express");

const {createCategory, getAll} = require('../controllers/adminCategoryController')
const adminCategoryRouter = Router();

adminCategoryRouter.post("/category",createCategory)
adminCategoryRouter.get("/category",getAll)



module.exports = {
  adminCategoryRouter,
};
