const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SaleSchema = new Schema ({
  clientName: {
    type: String,
    required: false
  },
  clientSurname: {
    type: String,
    required: false
  },
  productName: {
    type: String,
    required: false
  },
  sasia: {
    type: Number,
    required: false
  },
  cmimi: {
    type: Number,
    required: false
  },
  kodi: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sale = mongoose.model('sale', SaleSchema);