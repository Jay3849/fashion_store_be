const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

       

        name:{
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
          },
          isActive:{
            type:Boolean,
            default:true
          }



},
{
    timestamps: true, 
  }

)

const categoryModel = mongoose.model("categorys",categorySchema);

module.exports = categoryModel;