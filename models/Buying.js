const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BuyingSchema = new Schema ({
  clientName: {
    type: String,
    required: true
  },
  invoiceType: {
    type: Number,
    required: true
  },
  invoiceData: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Buying = mongoose.model('buying', BuyingSchema);