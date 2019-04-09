const Joi = require('joi')
const express = require('express')
const router = express.Router()
const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];
  
  // get list of genres
  router.get('/', (req, res) => {
    res.send(genres);
  });
  
  // post a genre
  router.post('/', (req, res) => {
      // validation
    const { error } = validateGenre(req.body); //object destructuring
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = {
      id: genres.length + 1,
      name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
  });
  
  // update genre
  router.put('/:id', (req, res) => {
      // lookup
      const genre = genres.find(c => c.id === parseInt(req.params.id));
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
      // validate
      const { error } = validateGenre(req.body); 
      if (error) return res.status(400).send(error.details[0].message);
      
      // update
      genre.name = req.body.name; 
      res.send(genre);
    });
    
  //   delete genre
    router.delete('/:id', (req, res) => {
      const genre = genres.find(c => c.id === parseInt(req.params.id));
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    
      const index = genres.indexOf(genre);
      genres.splice(index, 1);
    
      res.send(genre);
    });
  
  //   get a particular genre by id
  router.get('/:id', (req, res) => {
      const genre = genres.find(c => c.id === parseInt(req.params.id));
      if (!genre) return res.status(404).send('The genre with the given ID was not found.');
      res.send(genre);
    });
    
  
  // use joi to validate genre sent by client
  function validateGenre(genre) {
      const schema = {
        name: Joi.string().min(3).required()
      };
    
      return Joi.validate(genre, schema);
    }

    module.exports = router;
  