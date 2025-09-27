const express = require('express');
const router = express.Router();
const upload = require('../../../../../src/api/v1/middleware/multer');
const { authMiddleware, adminMiddleware } = require('../../../../../src/api/v1/middleware/auth.middleware');

const { handlerGetAllProducts } = require('../../../../../src/api/v1/controllers/admin/product.controller');

router.get('/', authMiddleware, adminMiddleware, handlerGetAllProducts);
// router.post('/add', upload.single('image'), handlerAddNews);
// router.delete('/delete/:id', handlerDeleteNews);

module.exports = router;
