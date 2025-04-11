// const UserModel = require("../../models/loginModel");
const UserModel = require("../models/loginModel");

const userValidators = require("../validators/userValidators");

const allUser = async (req, res) => {
  try {
    const { q, per_page, page } = req.query;
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
            { name: { $regex: q } },
            { email: { $regex: q } },
            { password: { $regex: q } },
          ],
        },
      });
    }
    aggregation.push(
      {
        $project: {
          password: 0,
        },
      },
      {
        $skip: options.skip,
      },
      { $limit: options.limit }
    );
    const getall = await UserModel.aggregate(aggregation).exec();

    if (!getall) {
      throw Error("users  not exists!!");
    }
    res.status(200).json(getall);
  } catch (error) {
    res.status(400).json({ msg: error?.message || "users not available!!" });
  }
};

module.exports = {
  allUser,
};
