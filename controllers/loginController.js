const UserModel = require("../models/loginModel");
const {
  registerValidator,
  loginValidator,
  forgetValidator,
  verifyPasswordValidator,
} = require("../validators/userValidators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//  is_admin =true
require("dotenv").config();

async function register(req, res) {
  try {
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
      throw Error("Invalid email ");
    }
    const authUserPass = jwt.verify(findUser.password, "jay");
    if (loginData?.password !== authUserPass) {
      throw Error("Invalid password");
    }

    const { email, name, _id, role } = findUser;
    let token = jwt.sign({ email, name, _id, role }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: findUser,
    });

    console.log("token", token);
  } catch (error) {
    console.error("jlklkllk", error.message);
    res.status(400).json({
      msg: error?.message || "Invalid Data please register after login",
    });
  }
}

async function forgotPassword(req, res) {
  try {
    let fogatdata = forgetValidator(req.body);
    const findUser = await UserModel.findOne({ email: fogatdata.email });
    if (!findUser) {
      throw Error("Invalid Email please Enter valid Email ");
    }
    const { email, _id } = findUser;
    res.status(200).json({
      token: jwt.sign({ email, _id }, "resetPassword"),
    });
  } catch (error) {
    res.status(400).json({
      msg: error?.message || "Invalid data please valid Data enter..",
    });
  }
}

const verifyPassword = async (req, res) => {
  const { token } = req.params;
  try {
    const validatedData = await verifyPasswordValidator({ ...req.body, token });
    await UserModel.findOneAndUpdate(
      { email: validatedData?.token?.email, _id: validatedData?.token?._id },
      { password: jwt.sign(validatedData.password, "jay") }
    );
    res.status(200).json({
      message: "Password Updated successfully...",
    });
  } catch (error) {
    res.status(400).json({
      msg: error || "Invalid data..",
    });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  verifyPassword,
};
