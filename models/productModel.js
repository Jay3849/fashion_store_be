const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: {
    ref:"categorys",
      required: true,
      type: mongoose.Schema.Types.ObjectId,

    },

    price: {
      type: String,
      required: true,
    },

    design: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      // required: true,
    },
    brand: {
      type: String,
      // required: true,
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
          // type: String,
        },
        textColor: {
          // type: String,
        },
      },
    ],

    size: [
      {
        type: String,
        required: true,
      },
    ],

    discription: {
      type: String,
    },
    rating: {
      type: String,
      // required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },

  {
    timestamps: true,
  }


);

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
