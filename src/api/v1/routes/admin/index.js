const express = require('express');
const router = express.Router();

const tinTucRoute = require('./tinTuc.route');
const uploadImageRoute = require('./uploadImage.route');

router.use('/TinTuc', tinTucRoute);
router.use('/upload-image', uploadImageRoute);

module.exports = router;
