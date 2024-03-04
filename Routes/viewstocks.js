const express = require('express');

const viewstocksController = require('../Controllers/viewstocks');

const router = express.Router();

router.get('/viewallstocks',viewstocksController.viewStock);
router.get('/viewallstocksforselect',viewstocksController.viewStockForSelect);
router.get('/viewonestockitem/:id',viewstocksController.viewOne);
    
module.exports = router;