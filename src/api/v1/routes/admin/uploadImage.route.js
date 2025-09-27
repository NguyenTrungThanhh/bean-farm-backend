const express = require('express');
const router = express.Router();
const upload = require('../../../../../src/api/v1/middleware/multer');
const uploadImage = require('../../../../../src/api/v1/controllers/admin/uploadImage.controller');
const { authMiddleware, adminMiddleware } = require('../../../../../src/api/v1/middleware/auth.middleware');

router.post('/', authMiddleware, adminMiddleware, upload.single('image'), uploadImage);

module.exports = router;
