const categoryModel = require("../models/categoryModel");
const categoryData = require("../validators/categoryValidator");


const createCategory = async (req, res) => {
  try {
    const validData = await categoryData({
      ...req.body,
    });

    const category = new categoryModel(validData);
    await category.save();
    res.status(201).json( category );
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



const getAll = async (req, res) => {
  try {
    const { q } = req.query;
    const aggregation = [];

    if (q) {
      aggregation.push({
        $match: {
          $or: [
            { name: { $regex: q, $options: "i" } }
          ]
        }
      });
    }
    aggregation.push({
      $sort: { createdAt: -1 }
    });

    const getall = await categoryModel.aggregate(aggregation);

    if (!getall || getall.length === 0) {
      throw new Error("No categories found...");
    }

    res.status(200).json(
      getall
    );
  } catch (error) {
    res.status(400).json({ success: false, msg: error?.message });
  }
};



const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await categoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!response) {
      throw new Error("Category not found!!!");
    }

    res.status(200).json(response );

  } catch (error) {
    res.status(400).json({ msg: error?.message || "Invalid category data!!!" });
  }
};


const deleteCategory = async(req,res)=>{
  try {
    const {id} = req.params;

    const cateegory = await categoryModel.deleteOne({_id:id})
    if(!cateegory){
      throw new Error ("category does not exist!!")
    }
    res.status(200).json(cateegory)
  } catch (error) {
    throw Error({msg:"error deleted category ",error:error.message})
    
  }
}




module.exports = { createCategory,getAll ,updateCategory,deleteCategory};
