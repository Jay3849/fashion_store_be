const { Router } = require("express");
const {
  register,
  login,
  forgotPassword,
  verifyPassword,
} = require("../controllers/loginController");

const loginrouter = Router();
loginrouter.post("/register", register);
loginrouter.post("/login", login);

loginrouter.post("/forgot-password", forgotPassword);
loginrouter.post("/verify_password/:token", verifyPassword);

module.exports = loginrouter;
