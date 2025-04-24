const { FileUploaderService } = require("../services/FileUploaderService");
const short = require("short-uuid");
const { FileUploadModules } = require("../utills/enum");
const ProductModel = require("../models/productModel");
const { uploadvalidData } = require("../validators/uploadFileValidator");

const uploadFile = async (req, res) => {
  try {
    const file = req.files?.image;

    const { module, id } = req.params;
    if (!file) {
      throw Error("File missing");
    }
    await uploadvalidData({ module, id });

    const fileUploader = new FileUploaderService();
    const public_id = short.generate();
    const result = await fileUploader.upload(file, public_id, module);
    console.log(result);

    let isSaved = false;
    switch (module) {
      case FileUploadModules.PRODUCT:
        await ProductModel.findOneAndUpdate(
          { _id: id },
          { image: result.secure_url || result.url }
        );
        isSaved = true;
        break;
      default:
        break;
    }
    return res.status(201).json({ status: isSaved,url: result.secure_url || result.url });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error?.message || "Invalid product details" });
  }
};

module.exports = {
  uploadFile,
};
