const AddressModel = require("../models/addressModel");
const addressValidator = require("../validators/addressValidator");



const createAddress = async(req,res)=>{

    try {

        const validData = await addressValidator({
            ...req.body,
        });
        validData.userId=req.user._id;
        const address = new AddressModel(validData);
        await address.save();
        res.status(201).json({ msg: "address created successfully...", address });     
    } catch (error) {
        res.status(400).json({ msg: error.message });
        
    }
}



const getAddress = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const pipeline = [
        {
          $match: {
            userId: userId
          }
        },
        {
          $sort: {
            createdAt: -1 
          }
        }
      ];
  
      const addresses = await AddressModel.aggregate(pipeline).exec();
  
      if (!addresses || addresses.length === 0) {
        return res.status(404).json({ msg: "No addresses found for this user." });
      }
  
      res.status(200).json(addresses);
  
    } catch (error) {
        res.status(400).json({ msg: error.message });

    }
  };
  


  const getAllAddresses = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const addresses = await AddressModel.aggregate([
        {
          $match: {
            userId: userId
          }
        },
        {
          $sort: {
            createdAt: -1 // Latest first
          }
        }
      ]).exec();
  
      if (!addresses.length) {
        return res.status(404).json({ msg: "No addresses found for this user." });
      }
  
      res.status(200).json({
       
       
        addresses,
      });
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  };
  

  const deleteAddress = async (req, res) => {
    try {
      const { addressId } = req.params;
      const userId = req.user._id; 
      console.log(addressId,userId);
      

      const isAddressExist  = await AddressModel.findOne({
        _id:addressId,
        userId
      })
      console.log(isAddressExist);
      
      if(!isAddressExist){
        throw new Error("address is not found this user")
      }
     await AddressModel.deleteOne({_id:addressId}) ;
     res.status(200).json({msg:"address delete succesfull"})
  
    } catch (error) {
      res.status(500).json({  msg: error.message });
    }
  };
  


module.exports = {createAddress,getAddress,getAllAddresses,deleteAddress}