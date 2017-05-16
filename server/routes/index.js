const express = require('express');
const path = require('path')
const router = express.Router();

const indexController = require(path.resolve(__dirname, '../controllers/index'));

router.get('/*', indexController);

module.exports = router;