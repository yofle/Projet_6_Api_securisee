const express = require('express');
const router = express.Router();//crait le router grâce à express

const auth = require('../middleware/auth');// on récupère auth
const multer = require('../middleware/multer');//on recupère multer (images)

const sauceCtrl = require('../controllers/sauce'); //importe les routes(thing) controllers

//middleware POST
// Ici, vous créez une instance de votre modèle sauce en lui passant un objet JavaScript 
// contenant toutes les informations requises du corps de requête analysé 
// (en ayant supprimé en amont le faux_id envoyé par le front-end).
router.post('/',auth, multer, sauceCtrl.createsauce );

//Modifier le thing deja existant
router.put('/:id',auth, multer, sauceCtrl.modifysauce);

//supprimer un thing
router.delete('/:id',auth, sauceCtrl.deletesauce);

//Permet de recup un objet spécifique
router.get('/:id',auth, sauceCtrl.getOnesauce);


// la route ne répond que au requête get, permet de récupérer les objets
router.get('/',auth, sauceCtrl.getAllsauce );

//on rajoute auth avant pour permettre de prendre en compte le gestionnaire du token


module.exports = router;//exporter router