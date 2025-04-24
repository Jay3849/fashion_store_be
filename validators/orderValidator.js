const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");
const addressModel = require("../models/addressModel")




const validatedOrderData = async (data) => {
  let { cartId, addressId } = data;
  console.log("jdjdjd", data);

  console.log("sdcsdcscsdcdscd", cartId);
  // const requiredFields = [
  //   "fullName",
  //   "phoneNumber",
  //   "street",
  //   "city",
  //   "state",
  //   "zipCode",
  //   "country",
  // ];
  if (!addressId) {
    throw new Error("AddressId is required!");
  }
    const exists = await addressModel.exists({_id:addressId})
    if(!exists){
      throw new Error("addressId  is not  valid!!!");
      
  
    }

  // const phoneRegex = /^[0-9]{10}$/;
  // if (!phoneRegex.test(addressId.phoneNumber)) {
  //   throw new Error("Invalid phone number! Must be 10 digits");
  // }

  // const zipRegex = /^\d{6}$/;
  // if (!zipRegex.test(String(addressId.zipCode))) {
  //   throw new Error("Invalid zip code! Must be exactly 6 digits.");
  // }

  if (!cartId) {
    throw Error("Cart ID is required to place an order");
  }
  const cartExists = await CartModel.exists({ _id: cartId }).exec();
  console.log("ksksk", cartExists);

  if (!cartExists) {
    throw new Error(
      "Cart not found. Please add products to your cart before ordering."
    );
  }
};

module.exports = { validatedOrderData };
