const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  screen: Number,
  shows: [String],
  totalTickets: Number,
  bookedTickets: { type: Number, default: 0 },
});

module.exports = mongoose.model('Movie', movieSchema);
