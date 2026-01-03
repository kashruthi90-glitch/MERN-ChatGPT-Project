const express = require('express');
const gptUserController = require('../controller/gptUserController');

const router = express.Router();

router.post('/', gptUserController.loginUser);
router.post('/signup', gptUserController.signinUser);

module.exports = router;