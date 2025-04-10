const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "duaeie3sp",
  api_key: process.env.CLOUINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

cloudinary.uploader.upload;
