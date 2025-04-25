const { Router } = require("express");
const {createAddress, getAddress, getAllAddresses, deleteAddress} = require("../controllers/addressController");
const { authMiddleware } = require("../middleware/auth");

const addressRouter = Router();

addressRouter.post("/address",authMiddleware,createAddress)
addressRouter.get("/address/:id",authMiddleware,getAddress)
addressRouter.get("/addresses/",authMiddleware,getAllAddresses)
addressRouter.delete("/address/:addressId",authMiddleware,deleteAddress)




module.exports = addressRouter;
