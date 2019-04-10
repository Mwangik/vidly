const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose')
const Fawn = require('fawn')
const express = require('express');
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
app = express();

Fawn.init(mongoose);

// connecting to db
mongoose.connect('mongodb://localhost/vidly')
    .then(() => debug('connected to db'))
    .catch( err => debug.error('could not connect to db...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));