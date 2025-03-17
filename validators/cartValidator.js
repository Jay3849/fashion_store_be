const cartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");

const cartValidator = async (data) => {
  if (!Array.isArray(data)) {
    throw Error("Invalid data");
  }
  for (const cardItem of data) {
    if (!cardItem.productId) {
      throw Error("Product id is require!!");
    }
    if (!cardItem.quantity || isNaN(+cardItem.quantity)) {
      throw Error("Quantity is require!!");
    }
    const isExists = await ProductModel.findOne({ _id: cardItem.productId });
    if (!isExists) {
      throw Error("Product doesn't exists");
    }
  }
  return data;
};

const cartUpdateValidator = async ({ id, quantity }) => {
  if (!id) {
    throw new Error("Product ID is required.");
  }
  if (!quantity || isNaN(+quantity) || +quantity <= 0) {
    throw new Error("Quantity must be a positive number.");
  }

  return { id, quantity };
};

module.exports = {
  cartValidator,
  cartUpdateValidator,
};
