const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/loginModel");


const orderReport = async(req,res)=>{
    
    try {
        const aggregation=[];

        


        const orderData = await orderModel.aggregate(aggregation).exec();
    
        console.log(orderData);
        res.status(200).json(orderData)


        
    } catch (error) {
    res.status(400).json({ msg: error?.message || "orders not available" });

        
    }
}


module.exports={
    orderReport
};
