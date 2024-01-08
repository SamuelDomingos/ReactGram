const multer = require("multer")
const path = require("path")

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      let folder = "";
  
      if (req.baseUrl.includes("users")) {
        folder = "users";
      } else if (req.baseUrl.includes("photos")) {
        folder = "photos";
      }
      cb(null, `uploads/${folder}/`);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
      console.log("Recebendo arquivo:", file.originalname);
      console.log("Destino do upload:", req.baseUrl);
  
      // Adicione a extensão .jpeg à expressão regular
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        // upload only png, jpg, and jpeg format
        console.log("Formato de arquivo inválido!");
        return cb(new Error("Por favor, envie apenas png, jpg ou jpeg!"));
      }
  
      console.log("Arquivo aceito.");
      cb(undefined, true);
    },
  });
  
  module.exports = { imageUpload };