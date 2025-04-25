const { Router } = require("express");
const {createAddress, getAddress, getAllAddresses} = require("../controllers/addressController");
const { authMiddleware } = require("../middleware/auth");

const addressRouter = Router();

addressRouter.post("/address",authMiddleware,createAddress)
addressRouter.get("/address/:id",authMiddleware,getAddress)
addressRouter.get("/addresses/",authMiddleware,getAllAddresses)



module.exports = addressRouter;
