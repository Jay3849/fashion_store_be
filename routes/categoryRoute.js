const { Router } = require("express");
const { getCategories, getAll } = require("../controllers/categoryController");

const categoryRouter = Router();


categoryRouter.get("/category",getAll, getCategories);

module.exports = categoryRouter;
