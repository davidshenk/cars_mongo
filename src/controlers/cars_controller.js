const Model = require('../models/cars_model');

const getCars = async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.find({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCar = async (req, res) => {
  const data = new Model({
    brandName: req.body.brandName,
    engineSize: req.body.engineSize,
    category: req.body.category,
    kilometerPerLiterFuel: req.body.kilometerPerLiterFuel,
    minimumPrice: req.body.minimumPrice,
    maximumPrice: req.body.maximumPrice,
    condition: req.body.condition,
  });
  console.log(data);
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCarById = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const data = await Model.findByIdAndUpdate(id, newData, { returnDocument: 'after' });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Model.findByIdAndDelete(id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCarsAndOwners = async (req, res) => {
  try {
    const data = await Model.aggregate([
      {
        $lookup: {
          from: 'drivers',
          localField: '_id',
          foreignField: 'carOwner',
          as: 'driverData',
        },
      },
      {
        $unwind: '$driverData',
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCarDriverAndInsurance = async (req, res) => {
  try {
    const data = await Model.aggregate([
      {
        $lookup: {
          from: 'drivers',
          localField: '_id',
          foreignField: 'carOwner',
          as: 'driverData',
          pipeline: [
            { $project: { 'carOwner': 0, '__v': 0 } }
        ],
        },
      },
      {
        $unwind: '$driverData',
      },
      {
        $lookup: {
          from: 'insurance',
          localField: '_id',
          foreignField: 'carInsured',
          as: 'insuranceData',
          pipeline: [
            { $project: { 'carInsured': 0, '__v': 0 } }
        ],
        },
      },
      
      {
        $unwind: '$insuranceData',
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCarById,
  deleteCarById,
  getCarsAndOwners,
  getCarDriverAndInsurance,
};
