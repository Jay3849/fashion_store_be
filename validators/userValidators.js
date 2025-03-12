const jwt = require("jsonwebtoken");
const registerValidator = (data) => {
  let { name, email, password } = data;
  if (!name || !email | !password) {
    throw Error("Details are required");
  }
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password) {
    password = jwt.sign(password, "jay");
  }
  console.log(password);
  return {
    name,
    email,
    password,
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

  return {
    email,
    password,
  };
};

module.exports = { registerValidator, loginValidator };
