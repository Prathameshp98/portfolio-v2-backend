const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');

router.get('/intro', controller.getIntro);

router.get('/about', controller.getAbout);

router.get('/social', controller.getSocial);

router.get('/experience', controller.getExperience);    

router.get('/project', controller.getProject);

module.exports = router;