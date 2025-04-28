const { Router } = require("express");
const { Report } = require("../controllers/reportController");
const { authMiddleware } = require("../middleware/auth");

const reportRouter = Router();

reportRouter.get("/report/:module",authMiddleware,Report);


module.exports = reportRouter