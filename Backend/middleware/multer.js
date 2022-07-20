//permet d'ajouter des images et de les enregistrer

const multer = require('multer');//impote multer

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({// diskStorage configure le chemin et le nom de fichier pour les fichiers entrants.
  destination: (req, file, callback) => {//la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;
    callback(null, 'images');
  },
  //la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et 
  //d'ajouter un timestamp Date.now() comme nom de fichier. 
  //Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et 
//lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.
module.exports = multer({storage: storage}).single('image');