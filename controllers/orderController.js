const CartModel = require("../models/cartModel");
const OrderModel = require("../models/orderModel");
const orderModel = require("../models/orderModel");
const { validatedOrderData } = require("../validators/orderValidator");

const orderdata = async (req, res) => {
  try {
    const { cartId, address } = req.params;
    await validatedOrderData({ cartId, address });
    const cartData = await CartModel.findOne({ _id: cartId }).populate(
      "items.productId",
      "items.address"
    );

    if (!cartData) {
      throw Error("not found");
    }
    console.log(cartData);
    let totalAmount = 0;
    const payload = {
      userId: cartData.userId,
      items: [],

      totalAmount: 0,
    };
    payload.items = cartData.items
      .filter((item) => item?.productId)
      .map((item) => {
        let dd = {
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.productId.price * item.quantity,
          size: item.size,
          address: item.address,
        };

        totalAmount += dd.price;
        return dd;
      });
    payload.totalAmount = totalAmount;
    const order = new OrderModel(payload);
    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ msg: error?.message });
  }
};

module.exports = {
  orderdata,
};
