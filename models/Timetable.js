const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TimetableSchema = new Schema ({
  important: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  sasia: {
    type: Number,
    required: false
  }
});

module.exports = Timetable = mongoose.model('timetable', TimetableSchema);