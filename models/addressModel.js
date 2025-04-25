const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    default: "India" 
  },
  landmark: {
    type: String
  },
  // isDefault: {
  //   type: Boolean,
  //   default: false
  // }
}, {
  timestamps: true
});

const AddressModel = mongoose.model('Address', addressSchema);

module.exports = AddressModel;
