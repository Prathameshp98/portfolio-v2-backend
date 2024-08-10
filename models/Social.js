const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialSchema = new Schema({
  socials: {
    type: Array,
    required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Social', SocialSchema);