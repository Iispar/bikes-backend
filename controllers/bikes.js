const bikesRouter = require('express').Router()
const Bike = require('../models/Bike')
const aqp =  require('api-query-params')
let filter = ""

/**
 * A method to get first x amount of bikes when the page is loaded and no filters
 * are used. This also changes when the filter variable changes as it sets the filters
 * for the search
 */
bikesRouter.get('/all', async (request, response) => {
  const bike = await Bike
    .find({Covered_distance: 100}).limit(10).lean()
  response.json(bike)
})

/**
 * Method for querys from frontend. 
 * We use api-query-params to get the params from the url query.
 */
bikesRouter.get('/', async (request, response) => {
  const { filter, limit, sort } = aqp(request.query)
  console.log(limit)
  console.log(filter)
  const bike = await Bike
    .find(filter).sort(sort).limit(limit).lean()
  response.json(bike)
})

module.exports = bikesRouter
