const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const ExperienceSchema = createTranslationSchema();
addCommonMethods(ExperienceSchema);

module.exports = mongoose.model('Experience', ExperienceSchema);