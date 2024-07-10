const express = require('express');
const { loginController, registerController, currentController } = require('../controllers/userController');
const ValidateToken = require('../middlewares/ValidateTokenHandler');
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/current", ValidateToken, currentController);



module.exports = router;