const categoryModel = require("../models/categoryModel");


const categorValidator  = async(data)=>{

    if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
      throw Error ("Category throname is required and must be a non-empty string");
      }


    const exists = await categoryModel.exists({name:data.name.trim()});
    console.log(exists);
    
    if(exists){
        throw Error("category is already exists!!")
    }

    return data;
}








module.exports = categorValidator;