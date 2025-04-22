const categoryModel = require("../models/categoryModel");
const ProductModel = require("../models/productModel");

const productValidator = async (data) => {
  let {
    name,
    categoryId,
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
  } = data;
  if (!name || !categoryId || !price) {
    throw Error("product details is require!!!");
  }

  if (
    (size && !Array.isArray(size)) ||
    size.some((s) => typeof s !== "string")
  ) {
    throw Error("size must be an Array of string");
  }
  // 'sdcsdc' = true
  // 9 = false
  const isExists = await ProductModel.findOne({ name });
  if (isExists) {
    throw new Error("Product Already Exists !");
  }
  if (isNaN(+price)) {
    throw new Error("Price must be an integer !");
  }

  const exists = await categoryModel.exists({_id:categoryId})
  if(!exists){
    throw new Error("category is not  valid!!!");
    

  }
  // const categoryRegex = ["Men", "women", "kids"];

  // if (!categoryRegex.includes(category)) {
  //   throw new Error("not valid category!!");
  // }

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
    categoryId,
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

  if (size) {
    payload.size = size;
  }
  if (tags) {
    payload.tags = tags;
  }
  return payload;
};

module.exports = {
  productValidator,
};
