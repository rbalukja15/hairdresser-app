const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SaleSchema = new Schema ({
  clientName: {
    type: String,
    required: true
  },
  clientSurname: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  sasia: {
    type: Number,
    required: true
  },
  cmimi: {
    type: Number,
    required: true
  },
  kodi: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sale = mongoose.model('sale', SaleSchema);