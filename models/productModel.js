const mongoose = require("mongoose");

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

  size: [
    {
      type: String,
    },
  ],

  discription: {
    type: String,
  },
  rating: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
