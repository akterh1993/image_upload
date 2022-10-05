const express = require("express");
const userController = require("../controllers/user.controller");
const router = express();

const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

const multer = require("multer");
const path = require("path");
 
router.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/userImages'), function(error, success){
        if(error) throw error
      });
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix, function(error1, success1){
        if(error1) throw error1
      });
    }
  })
  
  const upload = multer({ storage: storage });

  router.post('/register', upload.single('image'),userController.createUser);
  router.get('/register/:id', upload.single('image'),userController.getOneUser);
  router.get('/register/:id', upload.single('image'),userController.deleteUser);
  router.get('/register', upload.single('image'),userController.getAllUsers);
  router.patch('/register', upload.single('image'),userController.updateUser);

  module.exports = router;