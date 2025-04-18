const Role = require("../utills/enum");
const productModel = require("../models/productModel");

const validData = async (data) => {
  let {
    name,
    category,
    price,
    design,
    image,
    type,
    offer,
    brand,
    discount,
    tags,
    discription,
    rating,
    size,
    productId,
  } = data;

  if (!name || !price || !category || !type) {
    throw Error("must be enter feileds after update product!!");
  }

  const isExists = await productModel.findOne({ _id: productId });
  if (!isExists) {
    throw Error("product does not  Exists!!");
  }
  if (isNaN(+price)) {
    throw new Error("Price must be an integer !");
  }
  const imageRegex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim;

  if (!imageRegex.test(image)) {
    throw new Error("image url is not  valid!!!");
  }

  if (tags && Array.isArray(tags)) {
    for (const tag of tags) {
      if (!tag.type || !tag.label) {
        throw new Error("require tags details!!");
      }
    }
  } else if (tags && !Array.isArray(tags)) {
    throw new Error("Tags must be an array!!");
  }

  const payload = {
    name,
    category,
    price,
    design,
    image,
    type,
    offer,
    brand,
    discount,
    discription,
    rating,
  };
  return payload;
};

module.exports = { validData };
