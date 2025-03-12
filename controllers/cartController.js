const CartModel = require("../models/cartModel");
const cartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");
const { cartValidator } = require("../validators/cartValidator");

const addToCart = async (req, res) => {
  try {
    const cartValidatedData = await cartValidator(req.body);
    const existingCart = await CartModel.findOne({ userId: req.user._id });
    let response;
    if (existingCart) {
      response = await CartModel.findOne({ userId: req.user._id });
      response.items.push(...cartValidatedData);
      await response.save();
    } else {
      const payload = {
        userId: req.user._id,
        items: cartValidatedData,
      };
      const cartData = new CartModel(payload);
      await cartData.save();
      response = cartData;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
};

const cartProductUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    let findUserCart = await CartModel.findOne({ userId: req.user._id });
    console.log(id, req.body.quantity);
    if (findUserCart) {
      findUserCart = await CartModel.updateOne(
        { userId: req.user._id, "items.productId": id },
        { $set: { "items.$.quantity": req.body.quantity } }
      );
    } else {
      findUserCart = await CartModel.create({
        userId: req.user._id,
        items: [
          {
            productId: id,
            quantity: req.body.quantity,
          },
        ],
      });
    }
    //    if(!product.productId||!product.quantity){
    //     res.status4(400).json({msg:"productid and quantity are required"})
    //    }

    //    let cartUpdate=await CartModel.findOne({userId:req.user._id})
    res.status(200).json(findUserCart);
  } catch (error) {
    console.log(error);
  }
};

// /:id
// producId
//  user_id =>cart_item_id is present or not
// find item_id
// if present  update quantity
// create cart item  with item id

const getCartProduct = async (req, res) => {
  try {
    const populatedCart = await CartModel.findOne({ userId: req.user._id })
      .populate("items.productId")
      .populate("userId")
      .exec();

    if (!populatedCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error?.message || "Error fetching cart" });
  }
};

module.exports = {
  addToCart,
  getCartProduct,
  cartProductUpdate,
};
