const express = require('express');
const router = express.Router();
const upload = require('../../../../../src/api/v1/middleware/multer');
const uploadImage = require('../../../../../src/api/v1/controllers/admin/uploadImage.controller');

router.post('/', upload.single('image'), uploadImage);

module.exports = router;
