const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IconsSchema = new Schema({
  icons: {
    type: Array,
    required: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Icon', IconsSchema);