const UserModel = require("../models/loginModel");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidators");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    // validate data
    let validatedData = registerValidator(req.body || {});
    const user = new UserModel(validatedData);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: error?.message || "Invalid Data" });
  }
}

async function login(req, res) {
  try {
    let loginData = loginValidator(req.body);
    const findUser = await UserModel.findOne({ email: loginData.email });
    if (!findUser) {
      throw Error("Invalid Credentials");
    }
    findUser.password = null;
    const { email, name, _id } = findUser;
    res.status(200).json({
      token: jwt.sign({ email, name, _id }, "admin"),
      user: findUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ msg: error?.message || "Invalid Data" });
  }
}

module.exports = {
  register,
  login,
};
