const mongoose = require('mongoose');

const driversSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
    min: 18,
    max: 75,
  },
  carOwner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
});
module.exports = mongoose.model('drivers', driversSchema);
