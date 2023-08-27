const Model = require('../models/insurance_model');

const createInsuranceCompany = async (req, res) => {
  const data = new Model({
    name: req.body.name,
    address: req.body.address,
    isLowCost: req.body.isLowCost,
    carInsured: req.body.carInsured,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInsuranceCompanies = async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Model.find({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatedInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const data = await Model.findByIdAndUpdate(id, newData, { returnDocument: 'after' });
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletedInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Model.findByIdAndDelete(id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getInsuranceAndCars = async (req, res) => {
  try {
    const data = await Model.aggregate([
      {
        $lookup: {
          from: 'cars',
          localField: 'carInsured',
          foreignField: '_id',
          as: 'carData',
        },
      },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createInsuranceCompany,
  getInsuranceCompanies,
  getInsuranceCompanyById,
  updatedInsuranceCompanyById,
  deletedInsuranceCompanyById,
  getInsuranceAndCars,
};
