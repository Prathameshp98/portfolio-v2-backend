const mongoose = require('mongoose');
const { createSimpleSchema } = require('./BaseModel');

const SocialSchema = createSimpleSchema({
  socials: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Social', SocialSchema);