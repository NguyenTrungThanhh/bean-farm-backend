const express = require('express');
const router = express.Router();
const upload = require('../../../../../src/api/v1/middleware/multer');

const {
    handlerGetAllNews,
    handlerAddNews,
    handlerDeleteNews,
} = require('../../../../../src/api/v1/controllers/admin/tinTuc.controller');

router.get('/', handlerGetAllNews);
router.post('/add', upload.single('image'), handlerAddNews);
router.delete('/delete/:id', handlerDeleteNews);

module.exports = router;
