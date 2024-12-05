const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Booking = require('../models/Booking');
const User = require('../models/User');

router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

router.post('/bookings', async (req, res) => {
  const { userName, userEmail, movieName, tickets } = req.body;

  try {
    const user = await User.create({ name: userName, email: userEmail });
    const movie = await Movie.findOne({ name: movieName });

    if (movie.totalTickets - movie.bookedTickets >= tickets) {
      movie.bookedTickets += tickets;
      await movie.save();

      const booking = await Booking.create({
        user: { name: user.name, email: user.email },
        movie: movieName,
        showTime: "N/A",
        tickets,
      });

      res.json({ message: 'Booking successful!', booking });
    } else {
      res.status(400).json({ message: 'Not enough tickets available' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
});

module.exports = router;
