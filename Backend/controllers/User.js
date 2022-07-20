const bcrypt = require('bcrypt');//importe bcrypt
const jwt = require('jsonwebtoken');//importe jsonwebtoken

const User = require('../models/User');//importe le models User

//Pour l'enregistrement de nouveaux utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//Permet de crypter un Mpd , le nb plus c'est élevé et plus c'est long mais sécurisé 
    .then(hash => {
        //enregistre dans un nouveau user
      const user = new User({
        email: req.body.email,
        password: hash//on enregistre le mdp crypté
      });
      user.save()//enregistrer dans la base de donnée
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));//error 500 = error server
};

//Pour connecter les utilisateurs existants
exports.login = (req, res, next) => {
    //email ce sont les emails dans la base donnée
    //req.body.email c'est l'email qui vient d'être entrée dans le formulaire pour vérif
    User.findOne({ email : req.body.email })//recherché une comparaison pour vérifié l'email
    .then(user => {
        if (!user)  { //si user = null
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
        }
        bcrypt.compare(req.body.password, user.password)//utilise une comparaison entre mdp base de donnée et mdp entré
            .then(valid => {
                if (!valid)  { //non valid
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });//erreur 401 = non autorisé
                }
                //si correct
                res.status(200).json({//on retourne un objet qui retourne le userid et un token
                    userId: user._id,
                    //le token evite de modifier les informations et objet des autres utilisateurs
                    token: jwt.sign(
                        { userId: user._id },//donnée que l'on veut encoder
                        'RANDOM_TOKEN_SECRET',//clef secrète pour l'encodage
                        { expiresIn: '24h' }//appliquer une expiration de notre token de 24h
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));//erreur de traitement server
    })
    .catch(error => res.status(500).json({ error }));//erreur de traitement server

};