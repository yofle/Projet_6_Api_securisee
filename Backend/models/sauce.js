const mongoose = require('mongoose');//on va chercher la constante

//nous créons un schéma de données qui contient les champs souhaités pour chaque Thing, 
// indique leur type ainsi que leur caractère (obligatoire ou non).  
// Pour cela, on utilise la méthode Schema mise à disposition par Mongoose.
// Pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose ;
const sauceSchema = mongoose.Schema({

    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked:{type: [String],},
    usersDisliked:{type: [String],},

});

//ensuite, nous exportons ce schéma en tant que modèle Mongoose appelé « Thing », 
//le rendant par là même disponible pour notre application Express.
module.exports = mongoose.model('sauce', sauceSchema);