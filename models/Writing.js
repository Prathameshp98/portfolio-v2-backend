const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const WritingSchema = createTranslationSchema();
addCommonMethods(WritingSchema);

module.exports = mongoose.model('Writing', WritingSchema);