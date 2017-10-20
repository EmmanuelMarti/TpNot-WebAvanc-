'use strict';

'use strict';
// REQUIRE Modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Initialisation du port
const port = process.env.PORT || 3000;

//Configuration des urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'View')));

let catName = [];
app.get('/', (req, res, next) =>{
  console.log('Hello World ! ');
  res.json(catName);
});

app.get('/test', (req, res, next) =>{
  console.log('Hello World ! TEST');
  res.end();
});

app.get('/test/:name', (req, res, next) =>{
  console.log(`Hello ${req.params.name}`);
  res.end();
});

app.post('/', (req, res, next) =>{
  console.log(`Voici le super post ${req.body.cat}`);
  catName.push(req.body.cat);
  res.end();
});

/*app.post('/ajout/:name', (req, res, next) =>{
  Tab_name.push(req.params.name);
  console.log(`Voici le tableau actuel après l'ajout ${Tab_name}`);
  res.end();
});*/
app.put('/', (req, res, next)=>{
  console.log("Je passe bien par ici");
  updateCatName(req.body.nameToUpdate, req.body.newName, ()=>{
    res.end();
  });
});

function updateCatName(nameToUpdate, newName, callback){
  let index = catName.indexOf(nameToUpdate);
  catName[index] = newName;
  callback();
  
}
app.delete('/', (req, res, next)=>{
  console.log(`Le chat qui a été adopté est ${req.body.cat}`);
  let catAdopt = catName.indexOf(req.body.cat);
  catName.splice(catAdopt,1);
  res.end();
});

console.log('Suspens .....');
app.listen(port, ()=>{
  console.log(`Le serveur est bien démarré sur le port ${port}`);
});