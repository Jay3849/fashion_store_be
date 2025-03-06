const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,

      require: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    versionKey: false,
  }
);

const UserModel = new mongoose.model("user", UserSchema);

module.exports = UserModel;
