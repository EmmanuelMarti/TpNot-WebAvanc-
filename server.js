'use strict';

// REQUIRE Modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const pizza = require('./Controller/PizzaController');
const mongoose = require('mongoose');

// Initialisation du port
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/pizzas', (error)=>{
  if(error){
    console.log(error);
    process.exit(1);
  }
});
//Configuration des urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'View')));
app.use('/pizzas', pizza.router);


console.log('Suspens .....');
app.listen(port, ()=>{
  console.log(`Le serveur est bien démarré sur le port ${port}`);
});