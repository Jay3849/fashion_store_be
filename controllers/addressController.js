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

      const isAddressExist  = await AddressModel.findOneAndDelete({
        _id:addressId,
        userId:req.user._id
      })
      if(!isAddressExist){
        res.status(400).json({msg:"address is not found this user ",error})
      }
      res.status(200).json()
  
    } catch (error) {
      res.status(500).json({ success: false, msg: error.message });
    }
  };
  


module.exports = {createAddress,getAddress,getAllAddresses,deleteAddress}