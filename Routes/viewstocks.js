const express = require('express');

const viewstocksController = require('../Controllers/viewstocks');

const router = express.Router();

router.get('/viewallstocks',viewstocksController.viewStock);

module.exports = router;