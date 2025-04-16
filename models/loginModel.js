const mongoose = require("mongoose");
const { Roles } = require("../utills/enum");
// jkhk
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

    role: {
      type: String,
      enum: [Roles.Admin, Roles.User],
      default: Roles.User,
    },
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

const UserModel = new mongoose.model("users", UserSchema);

module.exports = UserModel;
