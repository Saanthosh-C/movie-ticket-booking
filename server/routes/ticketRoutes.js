import express from 'express';
import Ticket from '../models/Ticket.js';

import mongoose from 'mongoose';

const router = express.Router();


router.post('/dashboard', async (req, res) => {
  try {
    const totalRecord = await Ticket.find();


    const totalTickets = totalRecord.reduce((sum, record) => sum + (record.totalTickets || 0), 0);
    const soldTickets = totalRecord.reduce((sum, record) => sum + (record.soldTickets || 0), 0);
    
    const userBookings = totalRecord.map(({ userName, email, movie }) => ({
      userName,
      email,
      movie
    }));

    res.json({
      totalTickets,
      soldTickets,
      userBookings,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

router.put('/book', async (req, res) => {
  try {
    const { userName, email, movie, screen, showtime, ticketCount } = req.body;

    if (!ticketCount || ticketCount <= 0) {
      return res.status(400).json({ error: 'Invalid ticket count' });
    }

    const ticketRecord = await Ticket.find();

    if (!ticketRecord) {
      return res.status(404).json({ error: 'No ticket record found' });
    }

    if (ticketRecord.totalTickets - ticketRecord.soldTickets < ticketCount) {
      return res.status(400).json({ error: 'Not enough tickets available' });
    }

    ticketRecord.soldTickets += ticketCount;
    ticketRecord.totalTickets -= ticketCount;
    

    const newTicket = new Ticket({
      userName,
      email,
      movie,
      screen,
      showtime,
      soldTickets: ticketCount,
    });
    await newTicket.save();

    res.status(201).json({
      message: 'Ticket booked successfully!',
      ticket: newTicket,
      availableTickets: ticketRecord.totalTickets,
    });
  } catch (error) {
    console.error('Error booking ticket:', error);
    res.status(500).json({ error: 'Failed to book ticket' });
  }
});

router.get("/total", async (req, res) => {
  try {
    const response = await Total.find();
    console.log(response);
    res.json({ response });
  } catch (error) {
    console.error('Error fetching total tickets:', error);
    res.status(500).json({ error: 'Failed to fetch total tickets' });
  }
});

export default router;
