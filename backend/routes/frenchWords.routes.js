const express = require('express');
const router = express.Router();
const frenchWordController = require('../controllers/FrenchWord.controller');

router.get('/random', frenchWordController.getRandomFrenchWord);

module.exports = router;
