const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
  },
  movie: String,
  showTime: String,
  tickets: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);
