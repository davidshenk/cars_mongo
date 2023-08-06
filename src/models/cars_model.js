const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({
  brandName: {
    required: true,
    type: String,
  },
  engineSize: {
    required: true,
    type: Number,
  },
  category: {
    required: true,
    type: String,
  },
  kilometerPerLiterFuel: {
    required: true,
    type: Number,
  },
  minimumPrice: {
    required: true,
    type: Number,
  },
  maximumPrice: {
    required: true,
    type: Number,
  },
  condition: {
    required: false,
    type: String,
  },
});
module.exports = mongoose.model('cars', carsSchema);
