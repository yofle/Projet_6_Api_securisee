const express = require('express');//import de express
const router = express.Router();//creer le routeur

const userCtrl = require('../controllers/user');//associer les fonctions aux différentes routes
const protectemail = require("../middleware/protect-email")
const protectpassword = require("../middleware/protect-password")

//crait deux routes POST pour envoyer l'adresse mail et le mdp via le frontend
router.post('/signup',protectemail, protectpassword, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;//exporter le routeur