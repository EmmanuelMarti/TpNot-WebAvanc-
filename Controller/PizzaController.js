"use strict";
// On va définir tous les modules que l'on a de besoin afin de permettre au route d'exister
const express = require("express");
const app = express();
const router = express.Router();
const pizzaSchema = require('../Model/Pizza');
const bodyParser = require('body-parser');

// Configuration de body parser pour le post car il n'est pas dans le module express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Récupération de toutes les pizzas
router.get('/', (req, res) => {
    // envoi du status
    pizzaSchema.find({}, (err, doc) =>{
        console.log(doc);
        res.json(doc);
    });
    //res.status(200); // voir les status HTML pour connaitres les code et leur correspondances
  
    //res.sendFile(path.join(__dirname, '..', 'View', 'Project', 'ListProject.html')); // C'est la seule et unique page de notre SPA
});

// Insertion d'une nouvelle pizza
router.post('/', (req, res) => {
    let newPizza = new pizzaSchema({ 
            name: req.body.name, 
            price: req.body.price, 
            description: req.body.desc,
            dateCreated: req.body.dateCreated,
            dateUpdated: req.body.dateCreated,
    });
    newPizza.save( (err, doc)=> {
        if(err){
            console.error(err);
        } else {
            res.json(doc);
        }
    });
});


// Récupération d'une pizza en particulier
/**
 * 
 * @param string name
 * @return object json
 * 
 **/ 
router.get('/:name', (req, res) => {
    console.log(req.params);
    pizzaSchema.find({ name: req.params.name }, (err, doc) => {
        if(err){
            console.error(err);
        } else {
            console.log(doc);
            res.json(doc);
            /*res.status(200); // voir les status HTML pour connaitres les code et leur correspondances
            res.sendFile(path.join(__dirname, '..', 'View', 'Project', 'gantt.html')); // C'est la seule et unique page de notre SPA*/
        }
    });
});

//Modification d'une pizza
// Pour faire la modification de la pizza nous avons besoin de récuperer l'id 
// de la pizza.
/**
 * @params name string
 * @return error or object json
 * 
 **/ 
router.put('/:name', (req, res) => {
    pizzaSchema.findOneAndUpdate({name: req.body.oldName}, {$set: {
        name            : req.body.name,
        price           : req.body.price,
        description     : req.body.desc,
        dateCreated     : req.body.dateCreated,
        dateUpdated     : req.body.dateUpdated
        
    }}, {new: true}, (err,doc) => {
       if (err) { 
           throw err; 
       } else { 
           console.log("Updated"); 
           res.json(doc);
       }
     });
});

//Suppression d'une pizza
/**
 * @param id string
 * @return object json or an error
 * 
 **/
router.delete('/:id', (req, res) => {
    pizzaSchema.findOneAndRemove({_id : req.body.id}, (err,doc)=>{
        if(err){
            throw err;
        }else{
            console.log("Delete");
            res.json(doc);
        }
    });
});

exports.router = router;