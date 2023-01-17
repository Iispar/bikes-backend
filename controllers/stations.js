const stationsRouter = require('express').Router()
const Station = require('../models/Station')

/**
 * A method to get first 10 stations when the page is loaded and no filters
 * are used.
 */
 stationsRouter.get('/all', async (request, response) => {
    const station = await Station
      .find({}).limit(2).lean()
    response.json(station)
  })

module.exports = stationsRouter