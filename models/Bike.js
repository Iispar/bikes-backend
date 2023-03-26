/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  Departure: String,
  Return: String,
  Departure_station_id: String,
  Departure_station_name: String,
  Return_station_id: String,
  Return_station_name: String,
  Covered_distance: Number,
  Duration: Number,
});

bikeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

module.exports = mongoose.model('Biker', bikeSchema);
