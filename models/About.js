const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const AboutSchema = createTranslationSchema();
addCommonMethods(AboutSchema);

module.exports = mongoose.model('About', AboutSchema);
