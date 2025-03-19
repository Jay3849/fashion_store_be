const express = require("express");
const cors = require("cors");
const loginrouter = require("./routes/loginRoute");
const dbConnection = require("./configs/db");
const productRoute = require("./routes/productRoute");
const CartRouter = require("./routes/cartRoute");
const CategoryRouter = require("./routes/categoryRoute");
const app = express();

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   const qs = req.query;
//   console.log(Object.keys(qs), req.query);
//   req.query = Object.keys(qs).reduce((acc, qsKey) => {
//     let formatStr = qs[qsKey].replace(/\[|\]/g, "");
//     if (formatStr) {
//       formatStr = formatStr.replace(/^\[|\]$/g, "");

//       acc[qsKey] = formatStr.includes(",")
//         ? formatStr.split(",")
//         : qs[qsKey].startsWith("[")
//         ? [formatStr]
//         : formatStr;
//     }
//     return acc;
//   }, {});
//   next();
// });
app.use("/api", [loginrouter, productRoute, CartRouter, CategoryRouter]);

app.listen(3000, async () => {
  console.log(`server running on http://localhost:3000`);
  await dbConnection();
});
