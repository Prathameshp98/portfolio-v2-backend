const Intro = require('../models/Intro');
const Section = require('../models/Section');
const About = require('../models/About');
const Social = require('../models/Social');
const Experience = require('../models/Experience');
const Footer = require('../models/Footer');
const Project = require('../models/Project');
const Icon = require('../models/Icons');

async function getDataWithTranslation(req, res, db) {
    const { locale } = req.query;

    if (!locale) {
        return res.status(400).json({
            message: 'Locale not specified'
        });
    }

    try {
        const document = await db.findOne();

        if (document && document.translations && document.translations[0][locale]) {
            res.status(200).json(document.translations[0][locale]);
        } else {
            const fallbackLanguage = document.translations[0]['en-US'];
            res.status(200).json(fallbackLanguage);
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching data',
            error: err.message
        });
    }
};

async function getData(res, db) {
    db.find()
        .then(async(data) => {
            res.status(200).json({ data: data });
        })
        .catch(async(err) => {
            res.status(500).json({
                message: 'An error occurred while fetching data',
                error: err.message
            });
        });
}

exports.getIntro = async(req, res, next) => await getDataWithTranslation(req, res, Intro);

exports.getSection = async(req, res, next) => await getDataWithTranslation(req, res, Section);

exports.getAbout = async(req, res, next) => await getDataWithTranslation(req, res, About);

exports.getExperience = async(req, res, next) => await getDataWithTranslation(req, res, Experience);

exports.getProject = async(req, res, next) => await getDataWithTranslation(req, res, Project);

exports.getFooter = async(req, res, next) => await getDataWithTranslation(req, res, Footer);

exports.getSocial = async(req, res, next) =>  getData(res, Social);

exports.getIcon = async(req, res, next) => getData(res, Icon);