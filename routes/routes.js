const express = require('express');
const router = express.Router();
const introController = require('../controllers/controllers');

router.get('/intro', introController.getIntro);

router.get('/about', introController.getAbout);

router.get('/social', introController.getSocial);

module.exports = router;