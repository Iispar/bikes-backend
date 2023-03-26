const stationsRouter = require('express').Router();
const aqp = require('api-query-params');
const Station = require('../models/Station');

/**
 * A method to get first 10 stations when the page is loaded and no filters
 * are used.
 */
stationsRouter.get('/all', async (request, response) => {
  const station = await Station
    .find({})
    .limit(8)
    .lean();
  response.json(station);
});

/**
 * Method for querys from frontend.
 * We use api-query-params to get the params from the url query.
 */
stationsRouter.get('/', async (request, response) => {
  const {
    filter, limit, sort, skip,
  } = aqp(request.query);
  const station = await Station
    .find(filter)
    .skip(skip)
    .sort(sort)
    .limit(limit)
    .lean();
  response.json(station);
});

module.exports = stationsRouter;
