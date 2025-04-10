const jwt = require("jsonwebtoken");
const UserModel = require("../models/loginModel");
const bcrypt = require("bcrypt");
const { Roles } = require("../utills/enum");

const registerValidator = (data) => {
  let { name, email, password, role } = data;

  if (!name || !email | !password) {
    throw Error("Details are required");
  }
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }
  if (/\s/.test(password)) {
    throw new Error("Password should not contain spaces.");
  }
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
  if (password) {
    password = jwt.sign(password, "jay");
  }
  console.log(password);

  if (!role || ![Roles.Admin, Roles.User].includes(role)) {
    role = Roles.User; // Default role
  }
  console.log("role", role);

  return {
    name,
    email,
    password,
    role,
  };
};

const loginValidator = (data) => {
  let { email, password } = data;
  if (!email || !password) {
    throw Error("please Enter Feileds");
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const user = UserModel.findOne({ email });

  if (!user) {
    throw Error("Invalid Email or password");
  }

  return {
    email,
    password,
  };
};

//forgot password validator #####

const forgetValidator = (data) => {
  const { email } = data;
  if (!email) {
    throw Error("please Enter Feileds");
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  return { email };
};

const verifyPasswordValidator = async (data) => {
  let { password, confirmPassword, token } = data;
  if (!password) {
    throw Error("please Enter a new password");
  }

  if (!confirmPassword) {
    throw Error("please Enter confirm password");
  }
  if (!password || !confirmPassword || password !== confirmPassword || !token) {
    throw Error("password does not match..");
  }
  jwt.verify(token, "resetPassword", (err, decoded) => {
    if (err) {
      throw {
        status: false,
        message: "Token Expired ",
      };
    } else {
      token = decoded;
    }
  });

  return {
    password,
    token,
  };
};

module.exports = {
  registerValidator,
  loginValidator,
  forgetValidator,
  verifyPasswordValidator,
};
