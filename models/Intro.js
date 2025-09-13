const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const IntroSchema = createTranslationSchema();
addCommonMethods(IntroSchema);

module.exports = mongoose.model('Intro', IntroSchema);