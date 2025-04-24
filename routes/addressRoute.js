const { Router } = require("express");
const {createAddress, getAddress} = require("../controllers/addressController");
const { authMiddleware } = require("../middleware/auth");

const addressRouter = Router();

addressRouter.post("/address",authMiddleware,createAddress)
addressRouter.get("/address/:id",authMiddleware,getAddress)


module.exports = addressRouter;
