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
  status: {
    type: String,
    required: true
  },
  gjendjaCivile: {
    type: String,
    required: true
  },
  ditelindja: {
    type: String,
    required: false
  },
  dataFillim: {
    type: Date,
    required: true
  },
  dataMbarim: {
    type: Date,
    required: false
  },
  pozicioni: {
    type: String,
    required: false
  },
  arsimimi: {
    type: String,
    required: false
  },
  vendlindja: {
    type: String,
    required: false
  },
  adresa: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Employee = mongoose.model('employee', EmployeeSchema);