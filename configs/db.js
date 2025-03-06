const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnection() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("db connection successful");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = dbConnection;
