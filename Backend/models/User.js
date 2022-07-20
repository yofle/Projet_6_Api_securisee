const mongoose = require('mongoose');//installe mongoose sur ce fichier

const uniqueValidator = require('mongoose-unique-validator');//package de prévalidation des informations entrées par l'utilisateur

//on crait notre schéma attendu pour vérif
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },//unique permet de ne pas s'inscrire plusieurs fois avec la même adresse mail
  password: { type: String, required: true }
});

//Dans notre schéma, la valeur unique , avec l'élément mongoose-unique-validator passé comme plug-in, 
//s'assurera que deux utilisateurs ne puissent partager la même adresse e-mail.
userSchema.plugin(uniqueValidator);//le validator on l'applique au userSchéma

module.exports = mongoose.model('User', userSchema);//pour exporter le userSchéma sous forme de User