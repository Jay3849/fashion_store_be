const { default: mongoose } = require("mongoose");
const productModel = require("../models/productModel");
const { FileUploadModules } = require("../utills/enum");
// const FileUploadModules = require("../")

const uploadvalidData = async (data) => {
  const { module, id } = data;

  if (!module&&!Object.values(FileUploadModules).includes(module)) {
    throw Error("module is not exists!!");
  }

  if (!id) {
    throw Error("id is not exists !!");
  }
  console.log(mongoose.Types.ObjectId.isValid(id), id);
  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     throw Error("object id is not exists");
  //   }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Error("Invalid ObjectId format!");
  }
  let isExists = false;
  console.log(module);

  switch (module) {
    case FileUploadModules.PRODUCT:
      isExists = await productModel.findById(id);
      break;

    default:
      throw Error("module or id not suported!!");
  }
  console.log(isExists);
  if (!isExists) {
    throw Error("module is not exists");
  }
  return isExists;
};

module.exports = {
  uploadvalidData,
};
