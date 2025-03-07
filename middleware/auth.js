const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      throw Error("access denied");
    }
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
