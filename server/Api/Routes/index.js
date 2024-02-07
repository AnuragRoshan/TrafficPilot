const router = require("express").Router();


const userController = require("../Controller/userApi");
const auth = require("../Middleware/auth");




router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);
router.post("/startAssess", userController.startAssessment);
router.post("/toggleAnswer", userController.toggleAnswer);
// router.post("/addQuestion", userController.addQuestion);



router.get('/getUser', auth, userController.getUser);
router.get('/getQuestions', userController.getQuestions);

module.exports = router;