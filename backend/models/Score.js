const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: String,
  score: Number,
  language: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);