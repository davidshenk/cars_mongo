const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  isLowCost: {
    required: true,
    type: Boolean,
  },
  carInsured: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model('insuranceCompany',insuranceSchema)
