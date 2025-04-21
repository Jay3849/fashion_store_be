const ProductModel = require("../models/productModel")


const index =async(req,res)=>{
    let count=0;
    const products = await ProductModel.find();
   for (const prd of products) {
        if(!prd?.createdBy){
            prd.createdBy= '68009c89684f754259eea73a'
            count++
        }
        await prd.save()
   }


res.status(200).json({
    date:new Date(),count
})

}

module.exports={
    index
}