const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");

const cartValidator = async (data, userId) => {
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

    const cartExists = await CartModel.findOne({ userId });
    console.log("djdj", cartExists, userId);

    if (cartExists) {
      const itemExists = await CartModel.exists({
        userId,
        "items.productId": cardItem.productId,
        "items.size": cardItem.size,
      });

      if (itemExists) {
        throw Error("Item with the same size already in cart!");
      }
    }

    if (cardItem.size) {
      const sizeExists = await ProductModel.exists({
        _id: cardItem.productId,
        size: { $in: [cardItem.size] },
      });
      console.log(cardItem, sizeExists);

      if (!sizeExists) {
        throw new Error("Size  is not available for this product");
      }
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
