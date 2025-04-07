const ProductModel = require("../models/productModel");
// const adminloginValidator = require("../validators/adminValidator");
const { productValidator } = require("../validators/productValidator");
const { validData } = require("../validators/adminValidator");

const jwt = require("jsonwebtoken");
const UserModel = require("../models/loginModel");

const Roles = require("../utills/enum");

// async function getProducts(req, res, q) {
//   try {
//     const { q } = req.query;

//     console.log("csdscsdcsdcscsd");

//     const products = await ProductModel.find({ createdBy: req.user._id });

//     res.status(200).json(products);

//     const aggregation = [];

//     if (q) {
//       aggregation.push({
//         $match: {
//           $or: [
//             { name: { $regex: q, $options: "i" } },
//             { category: { $regex: q, $options: "i" } },
//             { design: { $regex: q, $options: "i" } },
//             { brand: { $regex: q, $options: "i" } },
//           ],
//         },
//       });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: "Error fetching products", error: error.message });
//   }

//   //product searching..
// }

const getProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const userId = req.user._id;

    const query = { createdBy: userId };

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { design: { $regex: q, $options: "i" } },
        { brand: { $regex: q, $options: "i" } },
      ];
    }

    const products = await ProductModel.find(query);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching products", error: error.message });
  }
};

async function addProduct(req, res) {
  try {
    if (req.user.role !== Roles.Admin) {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    let productData = await productValidator(req.body || {});

    productData.createdBy = req.user._id;

    const product = new ProductModel(productData);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
}

async function deleteProduct(req, res) {
  try {
    if (req.user.role !== Roles.Admin) {
      return res.status(403).json({ msg: "Access denied. Admins only." });
    }

    const product = await ProductModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!product) {
      return res
        .status(404)
        .json({ msg: "Product not found or access denied" });
    }

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error deleting product", error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    // Check if the user is an admin
    const { id } = req.params;
    const product = await validData({ ...req.body, productId: id });

    const response = await ProductModel.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });

    if (!response) {
      throw Error("Product not found or you don't have access.");
    }
    res.status(200).json({ msg: "Product updated successfully", response });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
}
module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};
