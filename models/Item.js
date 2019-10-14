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
    required: true
  },
  cmimBlerje: {
    type: Number,
    required: true
  },
  shitesi: {
    type: String,
    required: true
  },
  prodhuesi: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);