const mongoose = require('mongoose');

const FrenchWordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  category: { type: String, required: true }, 
  hint: { type: String }, 
  frequency: { type: Number, default: 0 }, 
  length: { type: Number } 
});

module.exports = mongoose.model('FrenchWord', FrenchWordSchema);
