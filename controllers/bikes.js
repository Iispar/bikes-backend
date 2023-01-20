const bikesRouter = require('express').Router()
const Bike = require('../models/Bike')
const aqp = require('api-query-params')

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
  const { filter, limit, sort, skip } = aqp(request.query)
  const bike = await Bike
    .find(filter)
    .skip(skip)
    .sort(sort)
    .limit(limit)
    .lean()
  response.json(bike)
})

/**
 * Method for API call that counts the amount of items. used with example how many journeys.
 */
bikesRouter.get('/count', async (request, response) => {
  const { filter } = aqp(request.query)
  const result = await Bike
    .count(filter)
  response.json(result)
})

/**
 * Method for API call that gets the average distance from departure station (from station).
 */
bikesRouter.get('/average/departure/:id/:month', async (request, response) => {
  const id = request.params.id
  let month = request.params.month
  let result = ''
  if (month === 'all') {
    result = await Bike.aggregate([
      { $match: {'Departure_station_id': id }},
      { $group: {_id: null, average: { $avg: '$Covered_distance'}}}
    ])
  } else {
    month = parseInt(month)
    result = await Bike.aggregate([
      { $addFields: { 'Month' : { $month: '$Departure' }}},
      { $match: {'$and': [{'Departure_station_id': id}, {'Month': month}]}},
      { $group: {_id: null, average: { $avg: '$Covered_distance'}}}
    ])
  }
  response.json(result)
})

/**
 * Method for API call that gets the average distance from return station (to station).
 */
bikesRouter.get('/average/return/:id/:month', async (request, response) => {
  const id = request.params.id
  let month = request.params.month
  let result = ''
  if (month === 'all') {
    result = await Bike.aggregate([
      { $match: {'Return_station_id': id }},
      { $group: {_id: null, average: { $avg: '$Covered_distance'}}}
    ])
  } else {
    month = parseInt(month)
    result = await Bike.aggregate([
      { $addFields: { 'Month' : { $month: '$Departure' }}},
      { $match: {'$and': [{'Return': id}, {'Month': month}]}},
      { $group: {_id: null, average: { $avg: '$Covered_distance'}}}
    ])
  }
  response.json(result)
})

/**
 * Return a list of 5 most common stations that are visited from parameter station
 */
bikesRouter.get('/top/departure/:id', async (request, response) => {
  const id = request.params.id
  const result = await Bike.aggregate([
    { $match: {'Departure_station_id': id}},
    { $sortByCount: '$Return_station_id'},
    { $limit: 5}
  ])
  response.json(result)
})

/**
 * Return a list of 5 most common stations that users come from to this station.
 */
bikesRouter.get('/top/return/:id', async (request, response) => {
  const id = request.params.id
  const result = await Bike.aggregate([
    { $match: {'Return_station_id': id}},
    { $sortByCount: '$Departure_station_id'},
    { $limit: 5}
  ])
  response.json(result)
})

module.exports = bikesRouter
