const express = require('express');
const billingContoroller = require('../Controllers/billing');


const router = express.Router();

router.post('/modifiedstocks',billingContoroller.modifiedStock);
router.post('/darftbill',billingContoroller.darftBill);
router.get('/viewdraft',billingContoroller.viewDraft);
router.get('/viewdraftbill/:_id',billingContoroller.viewDraftBill)

module.exports = router;