const mongoose = require("mongoose");
const { ProductTypeEnum } = require("../utills/enum");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },

  price: {
    type: String,
  },

  design: {
    type: String,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    enum: ProductTypeEnum,
  },
  offer: {
    type: String,
  },
  brand: {
    type: String,
  },
  discount: {
    type: String,
  },
  tags: [
    {
      type: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      bgColor: {
        type: String,
      },
      textColor: {
        type: String,
      },
    },
  ],

  discription: {
    type: String,
  },
  rating: {
    type: String,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
