const addressModel = require("../models/addressModel")

const addressValidator = (data) => {
    let {
      fullName,
      phoneNumber,
      pincode,
      city,
      state,
      country,
      addressLine,
      landmark,
      isDefault
    } = data;
  
    if (!fullName || !phoneNumber || !pincode || !city || !state || !addressLine) {
      throw new Error("All required address fields must be filled.");
    }
  
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      throw new Error("Invalid Indian phone number.");
    }
  
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    if (!pincodeRegex.test(pincode)) {
      throw new Error("Invalid Indian pincode.");
    }
  
    if (country && typeof country !== "string") {
      throw new Error("Country must be a string.");
    }
  
    if (landmark && typeof landmark !== "string") {
      throw new Error("Landmark must be a string.");
    }
  
    if (isDefault !== undefined && typeof isDefault !== "boolean") {
      throw new Error("isDefault must be true or false.");
    }
  
  
    if (!country) country = "India";
    if (!landmark) landmark = "";
  
    return {
      fullName,
      phoneNumber,
      pincode,
      city,
      state,
      country,
      addressLine,
      landmark,
      isDefault: isDefault || false
    };
  };
  
  module.exports = addressValidator;
  