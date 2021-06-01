const router = require('express').Router();
const authController = require("../../controllers/admin/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require('../controllers/upload.controller');
const multer = require ('multer');
const upload = multer();

// auth
router.post("/admin/register", authController.signUp);
router.post("/admin/login", authController.signIn);
router.get("/admin/logout", authController.logout);

// user DB
router.get('/read', userController.readUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);
router.patch("/dell/:id", userController.del);
//Uploads 
router.post("/upload", upload.single("file"), uploadController.uploadProfil);


module.exports = router;