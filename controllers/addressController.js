const AddressModel = require("../models/addressModel");
const addressValidator = require("../validators/addressValidator");



const createAddress = async(req,res)=>{

    try {
        const validData = await addressValidator({
            ...req.body,
        });

        const address = new AddressModel(validData);
        await address.save();
        res.status(201).json({ msg: "address created successfully...", address });     
    } catch (error) {
        res.status(400).json({ msg: error.message });
        
    }
}

module.exports = createAddress