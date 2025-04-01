const jwt = require("jsonwebtoken");
const UserModel = require("../models/loginModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw Error("access denied");
    }
    const user = jwt.verify(token, "admin");
    const isExits = await UserModel.exists({
      _id: user?._id,
    });
    if (!isExits) {
      throw Error("unathorized access");
    }
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    res.status(403).json({
      msg: error.message || "unathorized access",
      status_code: "E_UNAUTHORIZED_ACCESS",
    });
  }
};

module.exports = {
  authMiddleware,
};
