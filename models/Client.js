const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ClientSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Client = mongoose.model('client', ClientSchema);