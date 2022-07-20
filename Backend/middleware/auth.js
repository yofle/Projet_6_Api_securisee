const jwt = require('jsonwebtoken');//importation
 
//exportation du middleware
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];//on recupère le header et on le split(divise) la chaine de caractère
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');//on decode le token avec verify
       const userId = decodedToken.userId;//on récupère le userid
       req.auth = {//on crait un objet avec userid
           userId: userId
       };
    next();
   } catch(error) {
       res.status(401).json({ error });//non autorisé
   }
};