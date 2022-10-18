const multer =require("multer")

// ce middleware permet de gerer les extensions de fichiers ajoutés a notre site ainsi que le repertoire de destination
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


const storage = multer.diskStorage({
  
  destination: (req, file, callback) => {
    console.log("salut");
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    console.log("coucou"+name);
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() +"."+ extension );
  }
});

module.exports = multer({storage:storage}).single('file');