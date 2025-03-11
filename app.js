const express = require("express");
const cors = require("cors");
const loginrouter = require("./routes/loginRoute");
const dbConnection = require("./configs/db");
const productRoute = require("./routes/productRoute");
const CartRouter = require("./routes/cartRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", [loginrouter, productRoute, CartRouter]);

app.listen(3000, async () => {
  console.log(`server running on http://localhost:3000`);
  await dbConnection();
});
