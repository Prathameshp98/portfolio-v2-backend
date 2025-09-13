const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const SectionSchema = createTranslationSchema();
addCommonMethods(SectionSchema);

module.exports = mongoose.model('Section', SectionSchema);