const { Router } = require("express");
const { authMiddleware } = require("../middleware/auth");
const { uploadFile } = require("../controllers/FileUploadController");
// const cart = require;

const FileUploadRoute = Router();

FileUploadRoute.post("/upload/:module/:id", uploadFile);
module.exports = FileUploadRoute;
