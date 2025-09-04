const express = require('express');
const router = express.Router();

const { handlerSearchTinTuc } = require('../../../../../src/api/v1/controllers/client/search.controller');

router.get('/TinTuc', handlerSearchTinTuc);

module.exports = router;
