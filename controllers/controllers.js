const Intro = require('../models/Intro');
const About = require('../models/About');
const Social = require('../models/Social');

async function getData(req, res, db) {
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
            res.status(404).json({
                message: 'Locale not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred while fetching data',
            error: err.message
        });
    }
}

exports.getIntro = async(req, res, next) => await getData(req, res, Intro);

exports.getAbout = async(req, res, next) => await getData(req, res, About);

exports.getSocial = async(req, res, next) => {
    Social.find()
        .then(async(data) => {
            res.status(200).json({ data: data });
        })
        .catch(async(err) => {
            res.status(500).json({
                message: 'An error occurred while fetching data',
                error: err.message
            });
        })
}