const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      throw Error("access denied");
    }
    console.log(token);
    const user = jwt.verify(token, "admin");
    req.user = user;

    next();
  } catch (error) {
    res.status(403).json(error.message || "unathorized access");
  }
};

module.exports = {
  authMiddleware,
};
