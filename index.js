const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose')
const Fawn = require('fawn')
const express = require('express');
const users = require('.routes/users')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth');
app = express();

Fawn.init(mongoose);

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

// connecting to db
mongoose.connect('mongodb://localhost/vidly')
    .then(() => debug('connected to db'))
    .catch( err => debug.error('could not connect to db...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));