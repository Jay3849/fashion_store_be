const jwt = require("jsonwebtoken");
const UserModel = require("../models/loginModel");
const { Roles } = require("../utills/enum");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw Error("access denied");
    }
    const user = jwt.verify(token, "admin");
    const isExits = await UserModel.findOne({
      _id: user?._id,
    });
    if (!isExits) {
      throw Error("unathorized access");
    }
    req.user = isExits;
    console.log("hddh", req.user);
    next();
  } catch (error) {
    res.status(403).json({
      msg: error.message || "unathorized access",
      status_code: "E_UNAUTHORIZED_ACCESS",
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req?.user?.role !== Roles.Admin) {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};

module.exports = {
  authMiddleware,
  isAdmin,
};
