const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const FooterSchema = createTranslationSchema();
addCommonMethods(FooterSchema);

module.exports = mongoose.model('Footer', FooterSchema);