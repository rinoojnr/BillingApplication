const express = require('express');
const billingContoroller = require('../Controllers/billing');


const router = express.Router();

router.post('/modifiedstocks',billingContoroller.modifiedStock);

module.exports = router;