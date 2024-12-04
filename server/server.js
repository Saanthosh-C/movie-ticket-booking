import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import ticketRoutes from './routes/ticketRoutes.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', ticketRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.listen(5000, () => console.log('Server running on port 5000'));
