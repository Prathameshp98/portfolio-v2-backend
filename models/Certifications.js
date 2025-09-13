const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const CertificationsSchema = createTranslationSchema();
addCommonMethods(CertificationsSchema);

module.exports = mongoose.model('Certifications', CertificationsSchema);
