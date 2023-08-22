const Model = require('../models/drivers_model');

const createDriver = async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
    carOwner: req.body.carOwner,
  });
  console.log(data);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.find({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDriverById = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const data = await Model.findByIdAndUpdate(id, newData, { returnDocument: 'after' });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.findByIdAndDelete(id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDriversAndCars = async (req, res) => {
  try {
    const data = await Model.aggregate([
      {
        $lookup: {
          from: 'cars',
          localField: 'carOwner',
          foreignField: '_id',
          as: 'details',
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDrivers, getDriverById, createDriver, updateDriverById, deleteDriverById, getDriversAndCars };
