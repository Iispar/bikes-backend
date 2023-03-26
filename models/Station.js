/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  FID: String,
  ID: String,
  Name_fi: String,
  Name_swe: String,
  Name: String,
  Adress_fi: String,
  Adress: String,
  City_fi: String,
  City_swe: String,
  Operator: String,
  capasity: String,
  x: String,
  y: String,
});

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
  },
});

module.exports = mongoose.model('Station', stationSchema);
