const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

const carsController = require('./src/controlers/cars_controller.js');
const driversControler = require('./src/controlers/drivers_controler.js');

app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const mongoUrl = 'mongodb://127.0.0.1:27017/cars';

mongoose.connect(mongoUrl);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
});
database.once('connected', () => {
  console.log('database conected');
});

app.get('/cars/', (req, res) => {
  carsController.getCars(req, res);
});

app.get('/cars/:id', (req, res) => {
  carsController.getCarById(req, res);
});

app.post('/cars', (req, res) => {
  carsController.createCar(req, res);
});

app.put('/cars/:id', (req, res) => {
  carsController.updateCarById(req, res);
});

app.delete('/cars/:id', (req, res) => {
  carsController.deleteCarById(req, res);
});

app.get('/carsAndOwners/', (req, res) => {
  carsController.getCarsAndOwners(req, res);
});

// using drivers controller
app.get('/drivers/', (req, res) => {
  driversControler.getDrivers(req, res);
});

app.get('/drivers/:id', (req, res) => {
  driversControler.getDriverById(req, res);
});

app.post('/drivers/', (req, res) => {
  driversControler.createDriver(req, res);
});

app.put('/drivers/:id', (req, res) => {
  driversControler.updateDriverById(req, res);
});

app.delete('/drivers/:id', (req, res) => {
  driversControler.deleteDriverById(req, res);
});

app.get('/driversAndCars', (req, res) => {
  driversControler.getDriversAndCars(req, res);
});
