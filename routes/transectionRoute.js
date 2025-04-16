const { Router } = require("express");
const { transectionData } = require("../controllers/transectionController");

const TransectionRouter = Router();

TransectionRouter.post("/transaction/:orderId", transectionData);

module.exports = TransectionRouter;
