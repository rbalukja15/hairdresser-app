const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  kodi: {
    type: String,
    required: false
  },
  cmimBlerje: {
    type: Number,
    required: false
  },
  shitesi: {
    type: String,
    required: false
  },
  prodhuesi: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);