const { Router } = require("express");
const { getCategories } = require("../controllers/categoryController");

const categoryRouter = Router();


categoryRouter.get("/category", getCategories);

module.exports = categoryRouter;
