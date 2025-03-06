const { Router } = require("express");
const { register, login } = require("../controllers/loginController");

const loginrouter = Router();
loginrouter.post("/register", register);
loginrouter.post("/login", login);
module.exports = loginrouter;
