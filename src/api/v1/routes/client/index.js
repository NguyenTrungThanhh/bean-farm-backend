const express = require('express');
const router = express.Router();

const userRoute = require('./user.route');
const tinTucRoute = require('./tinTuc.route');
const searchRoute = require('./search.route');

router.use('/User', userRoute);
router.use('/TinTuc', tinTucRoute);
router.use('/Search', searchRoute);

module.exports = router;
