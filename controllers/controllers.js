const Intro = require('../models/Intro');
const Section = require('../models/Section');
const About = require('../models/About');
const Social = require('../models/Social');
const Experience = require('../models/Experience');
const Footer = require('../models/Footer');
const Project = require('../models/Project');
const Writing = require('../models/Writing');
const Icon = require('../models/Icons');
const { catchAsync, AppError } = require('../middleware/errorHandler');
const { sendSuccess, sendError } = require('../utils/responseHelper');

/**
 * Generic controller for models with translation support
 * @param {Object} Model - Mongoose model
 * @returns {Function} Express controller function
 */
const createTranslationController = (Model) => {
    return catchAsync(async (req, res, next) => {
        const { locale } = req.query;
        
        if (!locale) {
            return next(new AppError('Locale parameter is required', 400));
        }

        const document = await Model.findOne();
        
        if (!document) {
            return next(new AppError('No data found', 404));
        }

        // Use the model's getTranslation method
        const translation = document.getTranslation(locale);
        
        if (!translation) {
            return next(new AppError('Translation not found for the specified locale', 404));
        }

        sendSuccess(res, translation, `${Model.modelName} data retrieved successfully`);
    });
};

/**
 * Generic controller for simple models without translation
 * @param {Object} Model - Mongoose model
 * @returns {Function} Express controller function
 */
const createSimpleController = (Model) => {
    return catchAsync(async (req, res, next) => {
        const data = await Model.find();
        
        if (!data || data.length === 0) {
            return next(new AppError('No data found', 404));
        }

        sendSuccess(res, data, `${Model.modelName} data retrieved successfully`);
    });
};

// Export controllers using the factory functions
exports.getIntro = createTranslationController(Intro);
exports.getSection = createTranslationController(Section);
exports.getAbout = createTranslationController(About);
exports.getExperience = createTranslationController(Experience);
exports.getProject = createTranslationController(Project);
exports.getWriting = createTranslationController(Writing);
exports.getFooter = createTranslationController(Footer);
exports.getSocial = createSimpleController(Social);
exports.getIcon = createSimpleController(Icon);