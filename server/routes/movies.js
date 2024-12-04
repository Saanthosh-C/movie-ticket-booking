const express = require('express');
const Movie = require('../models/Movie');
const router = express.Router();


router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});


router.post('/book', async (req, res) => {
  const { movieName, showTime, tickets, user } = req.body;

  const movie = await Movie.findOne({ name: movieName });

  if (movie && movie.totalTickets - movie.bookedTickets >= tickets) {
    movie.bookedTickets += tickets;

    await movie.save();
    const newBooking = new Booking({ movie: movieName, showTime, tickets, user });
    await newBooking.save();

    res.json({ message: 'Booking successful!' });
  } else {
    res.status(400).json({ message: 'Not enough tickets available.' });
  }
});

module.exports = router;
