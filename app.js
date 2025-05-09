const express = require("express");
const cors = require("cors");
const loginrouter = require("./routes/loginRoute");
const dbConnection = require("./configs/db");
const productRoute = require("./routes/productRoute");
const CartRouter = require("./routes/cartRoute");
const CategoryRouter = require("./routes/categoryRoute");
const orderRouter = require("./routes/orderRoute");
const { authMiddleware, isAdmin } = require("./middleware/auth");
const { AdminRouter } = require("./routes/adminRoute");
const { adminCategoryRouter } = require("./routes/adminCategoryRoute");
const FileUploadRoute = require("./routes/fileUploadRoutes");
const fileUploader = require("express-fileupload");
const TransectionRouter = require("./routes/transectionRoute");
const reportRouter = require("./routes/reportRoute");
const { index } = require("./controllers/testController");
const addressRouter = require("./routes/addressRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors({origin:'*'}));
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
app.use("/api", fileUploader({ useTempFiles: true }), [
  loginrouter,
  productRoute,
  CartRouter,
  CategoryRouter,
  orderRouter,
  FileUploadRoute,
  TransectionRouter,

  addressRouter,
]);
app.use("/api/admin", authMiddleware, isAdmin, [
  AdminRouter,
  adminCategoryRouter,
  reportRouter,
]);
app.get("/", index);
app.listen(3000, async () => {
  console.log(`server running on http://localhost:3000`);
  await dbConnection();
});
