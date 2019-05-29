const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  pershkrimi: {
    type: String,
    required: true
  },
  sasia: {
    type: Number,
    required: true
  },
  cmimBlerje: {
    type: Number,
    required: true
  },
  cmimShitje: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('product', ProductSchema);