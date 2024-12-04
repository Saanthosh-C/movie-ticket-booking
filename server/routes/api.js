const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Booking = require("../models/Booking");
const User = require("../models/User");


router.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});


router.get("/bookings", async (req, res) => {
  const bookings = await Booking.find().populate("userId movieId");
  res.json(bookings);
});


router.post("/bookings", async (req, res) => {
  const { userName, userEmail, movieName } = req.body;

  const user = await User.create({ name: userName, email: userEmail });
  const movie = await Movie.findOne({ name: movieName });

  if (movie.availableTickets > 0) {
    await Booking.create({ userId: user._id, movieId: movie._id });
    movie.availableTickets -= 1;
    movie.soldTickets += 1;
    await movie.save();

    res.json({ message: "Booking successful" });
  } else {
    res.status(400).json({ message: "No tickets available" });
  }
});

module.exports = router;
