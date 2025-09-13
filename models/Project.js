const mongoose = require('mongoose');
const { createTranslationSchema, addCommonMethods } = require('./BaseModel');

const ProjectSchema = createTranslationSchema();
addCommonMethods(ProjectSchema);

module.exports = mongoose.model('Project', ProjectSchema);