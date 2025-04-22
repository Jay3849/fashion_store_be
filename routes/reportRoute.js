const { Router } = require("express");
const { orderReport } = require("../controllers/reportController");
const { authMiddleware } = require("../middleware/auth");

const reportRouter = Router();

reportRouter.get("/orderReport",authMiddleware,orderReport);


module.exports = reportRouter