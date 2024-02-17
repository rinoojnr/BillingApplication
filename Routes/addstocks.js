const express = require('express');

const addStocksItemController = require('../Controllers/addstocks');

const router = express.Router();

router.post('/addstocksitem',addStocksItemController.addStcoksitem);
router.post('/editstockitem/:_id',addStocksItemController.editStockitem);
router.post('/deletestockitem/:_id',addStocksItemController.deleteStockitem);
router.post('/searchitems/:search',addStocksItemController.searchItems);


module.exports = router;