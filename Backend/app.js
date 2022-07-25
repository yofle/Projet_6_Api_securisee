const express = require('express');//importer avec require
const mongoose = require('mongoose');//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB.
const helmet = require('helmet');//sécuriser vos applications Express en définissant divers en-têtes HTTP
const app = express(); //crait l'application express

const sauceRoutes = require('./routes/sauce');//importe le fichier route
const userRoutes = require('./routes/user');//importe userroutes

const path = require('path');

//adress srv cherché sur mongodb avec mdp
mongoose.connect('mongodb+srv://Yofle:Brioche01@projet6.yeycz.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use(express.json());//Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  
  //Pour CORS 
app.use((req, res, next) => {//Comme vous pouvez le voir dans le code, le middleware ne prend pas d'adresse en premier paramètre, afin de s'appliquer à toutes les routes. Cela permettra à toutes les demandes de toutes les origines d'accéder à votre API
    res.setHeader('Access-Control-Allow-Origin', '*');// d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();
  });

  app.use('/api/sauces', sauceRoutes);//exécute le fichier sauces.js dans route
  app.use('/api/auth', userRoutes);//exécute le fichier auth
  app.use('/images', express.static(path.join(__dirname, 'images')));//Cela indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname) à chaque fois qu'elle reçoit une requête vers la route /images. Enregistrez et actualisez l'application dans le navigateur.

  module.exports = app;