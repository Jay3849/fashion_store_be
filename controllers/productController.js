const ProductModel = require("../models/productModel");
const { productValidator } = require("../validators/productValidator");

async function createProduct(req, res) {
  try {
    let productData = await productValidator(req.body || {});

    console.log(productData);
    const product = new ProductModel(productData);
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productValidator(req.body || {});
    // 1. get id from params
    const { id } = req.params;
    // 2. find product
    const response = await ProductModel.findOneAndUpdate({ _id: id }, product, {
      new: true,
    });

    // 3. if product does not exists throw error
    if (!response) {
      throw Error("Product does not exists");
    }
    // 4. if product exists update

    // 5. return updated product
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const remove = await ProductModel.deleteOne({ _id: id });

    if (!remove) {
      throw Error("Product does not exists");
    }
    res.status(200).json(remove);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
}

async function getOne(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const getone = await ProductModel.findOne({ _id: id });

    if (!getone) {
      throw Error("Product does not exists");
    }
    res.status(200).json(getone);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "product not available" });
  }
}

async function getall(req, res) {
  try {
    const { page, per_page, category, type, q } = req.query;
    const options = { limit: per_page ?? 10, skip: 0 };
    const aggregation = [];

    if (+page > 1) {
      options.skip = (+page - 1) * (per_page || options.limit);
      options.limit = +(per_page || options.limit);
    }
    if (q) {
      aggregation.push({
        $match: {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
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

    if (category) {
      aggregation.push({
        $match: {
          category,
        },
      });
    }

    aggregation.push(
      {
        $skip: options.skip,
      },
      { $limit: options.limit }
    );
    const getall = await ProductModel.aggregate(aggregation).exec();

    if (!getall) {
      throw Error("Products does not exists");
    }
    res.status(200).json(getall);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "producs not available" });
  }
}

module.exports = {
  updateProduct,
  createProduct,
  deleteProduct,
  getOne,
  getall,
};
