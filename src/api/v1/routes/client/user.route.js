const express = require('express');
const router = express.Router();

const {
    handlerRegister,
    handlerVerifyEmail,
    handlerLogin,
} = require('../../../../../src/api/v1/controllers/client/user.controller');

router.post('/register', handlerRegister);
router.get('/verify-email', handlerVerifyEmail);
router.post('/login', handlerLogin);

module.exports = router;
