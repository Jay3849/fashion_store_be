const cloudinary = require("cloudinary").v2;

class FileUploaderService {
  cloudinary;
  constructor() {
    cloudinary.config({
      cloud_name: "duaeie3sp",
      api_key: process.env.CLOUINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    this.cloudinary = cloudinary;
  }
  async upload(file, public_id, folder = "assets") {
    try {
      const uploadResult = await this.cloudinary.uploader
        .upload(file.tempFilePath, {
          public_id,
          folder,
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
      return uploadResult;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = {
  FileUploaderService,
};
