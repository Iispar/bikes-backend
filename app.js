const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bikesRouter = require('./controllers/bikes');
const stationsRouter = require('./controllers/stations');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  });

app.use(cors());
app.use(express.json());
app.use('/api/stations', stationsRouter);
app.use('/api/bikers', bikesRouter);

module.exports = app;
