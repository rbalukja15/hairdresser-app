const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EmployeeSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  numerSigurime: {
    type: String,
    required: true
  },
  pozicioni: {
    type: String,
    required: false
  },
  adresa: {
    type: String,
    required: true
  },
  paga: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);