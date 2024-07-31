const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.get('/', loginController.showLogin);

router.post('/add', loginController.createUser);
router.post('/', loginController.loginUser);

module.exports = router;
