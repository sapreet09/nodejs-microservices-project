const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
// const validate = require('../middlewares/validate.middleware');
// const { registerSchema } = require('../validators/auth.validator');

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;