import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  movie: { type: String, required: true },
  screen: { type: Number, required: true },
  showtime: { type: String, required: true },
  date: { type: Date, default: Date.now },
  totalTickets: { type: Number, required: true, default: 1200 }, 
  soldTickets: { type: Number, required: true, default: 0 }, 
  ticketPerShow: { type: Number, required: true, default: 100 } 
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
