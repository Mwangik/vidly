const mongoose = require('mongoose')
const express = require('express');
const genres = require('./routes/genres')
app = express();

// connecting to db
mongoose.connect('mongodb://localhost/vidly')
    .then(() => debug('connected to db'))
    .catch( err => debug.error('could not connect to db...', err));

app.use(express.json());
app.use('/api/genres', genres)


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));