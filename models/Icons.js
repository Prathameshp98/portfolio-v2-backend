const mongoose = require('mongoose');
const { createSimpleSchema } = require('./BaseModel');

const IconsSchema = createSimpleSchema({
  icons: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Icon', IconsSchema);