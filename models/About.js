const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  defaultLanguage: { type: String, required: true },
  translations: {
    type: Array,
    required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('About', AboutSchema);
