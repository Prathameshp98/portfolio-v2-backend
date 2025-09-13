const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const { validateLocale } = require('../middleware/validation');

// Routes with translation support (require locale validation)
router.get('/intro', validateLocale, controller.getIntro);
router.get('/section', validateLocale, controller.getSection);
router.get('/about', validateLocale, controller.getAbout);
router.get('/experience', validateLocale, controller.getExperience);
router.get('/project', validateLocale, controller.getProject);
router.get('/writing', validateLocale, controller.getWriting);
router.get('/footer', validateLocale, controller.getFooter);

// Routes without translation support
router.get('/social', controller.getSocial);
router.get('/icon', controller.getIcon);

module.exports = router;