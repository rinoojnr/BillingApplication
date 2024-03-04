const express = require('express');

const categoryContoller = require('../Controllers/categories');


const router = express.Router();

router.get('/getcategories',categoryContoller.getCategories);

module.exports = router;