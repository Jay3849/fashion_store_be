const orderModel = require("../models/orderModel");
const UserModel = require("../models/loginModel");
const { transectionModel } = require("../models/transectionModel");

const transectionValidData = async (data) => {
  const { orderId, paymentId } = data;

  if (!paymentId) {
    throw Error("paymentId is require..");
  }

  if (!orderId) {
    throw Error("orderid is require");
  }

  const orderExist = await orderModel.exists({ _id: orderId }).exec();

  if (!orderExist) {
    throw Error("orderId does not exist ... ");
  }

  const transection = await transectionModel.findOne({ orderId });
  if (transection && transection?.status === TransectionStatus.SUCCESS) {
    throw Error("Already paid");
  }
};

module.exports = transectionValidData;
