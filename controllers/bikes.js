const bikesRouter = require('express').Router();
const aqp = require('api-query-params');
const Bike = require('../models/Bike');

/**
 * A method to get first 10 bikes when the page is loaded and no filters
 * are used.
 */
bikesRouter.get('/all', async (request, response) => {
  const bike = await Bike
    .find({})
    .limit(9)
    .lean();
  response.json(bike);
});

/**
 * Method for querys from frontend.
 * We use api-query-params to get the params from the url query.
 */
bikesRouter.get('/', async (request, response) => {
  const {
    filter, limit, sort, skip,
  } = aqp(request.query);
  const bike = await Bike
    .find(filter)
    .skip(skip)
    .sort(sort)
    .limit(limit)
    .lean();
  response.json(bike);
});

/**
 * Method for API call that counts the amount of items. used with example how many journeys.
 */
bikesRouter.get('/count/departure/:id/:month', async (request, response) => {
  const { id } = request.params;
  let { month } = request.params;
  if (month === 'all') {
    const result = await Bike.aggregate([
      { $match: { Departure_station_id: id } },
      { $count: 'count' },
    ]);
    response.json(result);
  } else {
    month = parseInt(month, 10);
    const result = await Bike.aggregate([
      { $addFields: { Month: { $month: '$Departure' } } },
      { $match: { $and: [{ Departure_station_id: id }, { Month: month }] } },
      { $count: 'count' },
    ]);
    response.json(result);
  }
});

/**
 * Method for API call that counts the amount of items. used with example how many journeys.
 */
bikesRouter.get('/count/return/:id/:month', async (request, response) => {
  const { id } = request.params;
  let { month } = request.params;
  if (month === 'all') {
    const result = await Bike.aggregate([
      { $match: { Return_station_id: id } },
      { $count: 'count' },
    ]);
    response.json(result);
  } else {
    month = parseInt(month, 10);
    const result = await Bike.aggregate([
      { $addFields: { Month: { $month: '$Return' } } },
      { $match: { $and: [{ Return_station_id: id }, { Month: month }] } },
      { $count: 'count' },
    ]);
    response.json(result);
  }
});

/**
 * Method for API call that gets the average distance from departure station (from station).
 */
bikesRouter.get('/average/departure/:id/:month', async (request, response) => {
  const { id } = request.params;
  let { month } = request.params;
  let result = '';
  if (month === 'all') {
    result = await Bike.aggregate([
      { $match: { Departure_station_id: id } },
      { $group: { _id: null, average: { $avg: '$Covered_distance' } } },
    ]);
  } else {
    month = parseInt(month, 10);
    result = await Bike.aggregate([
      { $addFields: { Month: { $month: '$Departure' } } },
      { $match: { $and: [{ Departure_station_id: id }, { Month: month }] } },
      { $group: { _id: null, average: { $avg: '$Covered_distance' } } },
    ]);
  }
  response.json(result);
});

/**
 * Method for API call that gets the average distance from return station (to station).
 */
bikesRouter.get('/average/return/:id/:month', async (request, response) => {
  const { id } = request.params;
  let { month } = request.params;
  let result = '';
  if (month === 'all') {
    result = await Bike.aggregate([
      { $match: { Return_station_id: id } },
      { $group: { _id: null, average: { $avg: '$Covered_distance' } } },
    ]);
  } else {
    month = parseInt(month, 10);
    result = await Bike.aggregate([
      { $addFields: { Month: { $month: '$Departure' } } },
      { $match: { $and: [{ Return_station_id: id }, { Month: month }] } },
      { $group: { _id: null, average: { $avg: '$Covered_distance' } } },
    ]);
  }
  response.json(result);
});

/**
 * Return a list of 5 most common stations that are visited from parameter station
 */
bikesRouter.get('/top/departure/:id/:month', async (request, response) => {
  const { id } = request.params;
  let { month } = request.params;
  if (month === 'all') {
    const result = await Bike.aggregate([
      { $match: { Departure_station_id: id } },
      { $sortByCount: '$Return_station_id' },
      { $limit: 5 },
    ]);
    response.json(result);
  } else {
    month = parseInt(month, 10);
    const result = await Bike.aggregate([
      { $addFields: { Month: { $month: '$Departure' } } },
      { $match: { $and: [{ Departure_station_id: id }, { Month: month }] } },
      { $sortByCount: '$Return_station_id' },
      { $limit: 5 },
    ]);
    response.json(result);
  }
});

/**
 * Return a list of 5 most common stations that users come from to this station.
 */
bikesRouter.get('/top/return/:id/:month', async (request, response) => {
  const { id } = request.params;
  let { month } = request.params;
  if (month === 'all') {
    const result = await Bike.aggregate([
      { $match: { Return_station_id: id } },
      { $sortByCount: '$Departure_station_id' },
      { $limit: 5 },
    ]);
    response.json(result);
  } else {
    month = parseInt(month, 10);
    const result = await Bike.aggregate([
      { $addFields: { Month: { $month: '$Departure' } } },
      { $match: { $and: [{ Return_station_id: id }, { Month: month }] } },
      { $sortByCount: '$Departure_station_id' },
      { $limit: 5 },
    ]);
    response.json(result);
  }
});

module.exports = bikesRouter;
