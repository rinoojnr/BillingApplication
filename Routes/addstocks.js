const express = require('express');

const addStocksItemController = require('../Controllers/addstocks');

const router = express.Router();

router.post('/addstocksitem',addStocksItemController.addStcoksitem);


module.exports = router;