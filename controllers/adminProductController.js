// const ProductModel = require("../models/productModel");
const ProductModel = require("../models/productModel");

// const adminloginValidator = require("../validators/adminValidator");
const {  validateProductdata } = require("../validators/adminValidator");

const jwt = require("jsonwebtoken");

const { Roles } = require("../utills/enum");
const { default: mongoose } = require("mongoose");

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
    const { q, page, per_page, type, categoryId } = req.query;
    const options = { limit: per_page ?? 12, skip: 0 };
    const userId = req.user._id;
    const aggregation = [];

    const query = { createdBy: userId };

    if (+page > 1) {
      options.skip = (+page - 1) * (per_page || options.limit);
      options.limit = +(per_page || options.limit);
    }

    if (q) {
      aggregation.push({
        $match: {
          $or: [
            { name: { $regex: q, $options: "i" } },
            // { category: { $regex: q, $options: "i" } },
            { design: { $regex: q, $options: "i" } },
            { brand: { $regex: q, $options: "i" } },
          ],
        },
      });
    }

    if (type) {
      aggregation.push({
        $match: {
          type,
        },
      });
    }

    // if (categoryId && categoryId?.length) {
    //   aggregation.push({
    //     $match: {
    //       categoryId: { $in: categoryId },
    //     },
    //   });
    // }
    if (categoryId) {
          const categoryIdArray = Array.isArray(categoryId) ? categoryId : [categoryId];    
          const categoryIdFilter = categoryIdArray.map(id => mongoose.Types.ObjectId.createFromHexString(id));
          aggregation.push({
            $match: {
              categoryId: { $in: categoryIdFilter },
            },
          });
        }


    aggregation.push(
      {
        $lookup: {
          from: "categorys", 
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category" 
      },
    )
    aggregation.push({
      $sort: { createdAt: -1 },
    });

    aggregation.push(
      {
        $skip: options.skip,
      },
      {
        $limit: options.limit,
      }
    );
    aggregation;
    const products = await ProductModel.aggregate(aggregation).exec([
      
    ]);

    if (!products) {
      throw Error("product does not exists");
    }
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

    let productData = await validateProductdata({...(req.body || {}),action:'create'});

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
    const product = await validateProductdata({ ...req.body, productId: id,action:"edit" });

    const response = await ProductModel.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });

    if (!response) {
      throw Error("Product not found or you don't have access.");
    }
    res.status(200).json( response );
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
