const mongoose = require('mongoose')
const express = require('express')
const {Customer,validate} = require('../models/customer')
const router = express.Router()


  // get list of customers
  router.get('/', async (req, res) => {
    const customers =  await Customer.find().sort('name');
    res.send(customers);
  });
  
  // post a customer
  router.post('/', async (req, res) => {
      // validation
    const { error } = validate(req.body); //object destructuring
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold
    });
    customer = await customer.save()
    res.send(customer);  
  });
  
  // update customer
  router.put('/:id', async (req, res) => {
      // validate
      const { error } = validate(req.body); 
      if (error) return res.status(400).send(error.details[0].message);
      // lookup and update
      const customer = await Customer.findByIdAndUpdate(req.params.id,
         {name: req.body.name,
          phone: req.body.phone,
          isGold: req.body.isGold },
         { new: true });
      if (!customer) return res.status(404).send('The customer with the given ID was not found.');
      
      res.send(customer);
    });
    
  //   delete customer
    router.delete('/:id', async (req, res) => {
      const customer = await Customer.findByIdAndRemove(req.params.id);
      if (!customer) return res.status(404).send('The customer with the given ID was not found.');
        
      res.send(customer);
    });
  
  //   get a particular customer by id
  router.get('/:id', async (req, res) => {
      const customer =  await Customer.findById(req.params.id)
      if (!customer) return res.status(404).send('The customer with the given ID was not found.');
      res.send(customer);
    });

    module.exports = router;
    
  
  
  