const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BuyingSchema = new Schema ({
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
  sasia: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Buying = mongoose.model('buying', BuyingSchema);