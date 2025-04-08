const UserModel = require("../models/loginModel");

const userValidators = require("../validators/userValidators");

const allUser = async (req, res) => {
  try {
    const { q } = req.query;
    const aggregation = [];

    if (q) {
      aggregation.push({
        $match: {
          $or: [
            { name: { $regex: q } },
            { email: { $regex: q } },
            { password: { $regex: q } },
          ],
        },
      });

      const getall = await UserModel.aggregate(aggregation).exec();

      if (!getall) {
        throw Error("users  not exists!!");
      }
      res.status(200).json(getall);
    }
  } catch (error) {
    res.status(400).json({ msg: error?.message || "users not available!!" });
  }
};

module.exports = {
  allUser,
};
