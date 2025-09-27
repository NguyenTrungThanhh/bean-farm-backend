const express = require('express');
const router = express.Router();
const upload = require('../../../../../src/api/v1/middleware/multer');
const { authMiddleware, adminMiddleware } = require('../../../../../src/api/v1/middleware/auth.middleware');

const {
    handlerGetAllNews,
    handlerAddNews,
    handlerDeleteNews,
} = require('../../../../../src/api/v1/controllers/admin/tinTuc.controller');

router.get('/', authMiddleware, adminMiddleware, handlerGetAllNews);
router.post('/add', authMiddleware, adminMiddleware, upload.single('image'), handlerAddNews);
router.delete('/delete/:id', authMiddleware, adminMiddleware, handlerDeleteNews);

module.exports = router;
