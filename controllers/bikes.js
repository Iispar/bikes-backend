const bikesRouter = require('express').Router()
const Bike = require('../models/Bike')
const aqp =  require('api-query-params')

/**
 * A method to get first 10 bikes when the page is loaded and no filters
 * are used.
 */
bikesRouter.get('/all', async (request, response) => {
  const bike = await Bike
    .find({})
    .limit(10)
    .lean()
  response.json(bike)
})

/**
 * Method for querys from frontend. 
 * We use api-query-params to get the params from the url query.
 */
bikesRouter.get('/', async (request, response) => {
  const { filter, limit, sort } = aqp(request.query)
  const bike = await Bike
    .find(filter)
    .sort(sort)
    .limit(limit)
    .lean()
  response.json(bike)
})

module.exports = bikesRouter
