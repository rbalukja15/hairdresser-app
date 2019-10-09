const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moment = require("moment");

// Create Schema
const EventSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

module.exports = Event = mongoose.model('event', EventSchema);