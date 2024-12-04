import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ movie, screen, showtime, onClose }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [ticketCount, setTicketCount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const parsedTicketCount = parseInt(ticketCount, 10);
    if (isNaN(parsedTicketCount) || parsedTicketCount <= 0) {
      setError('Please enter a valid number of tickets');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put('http://localhost:5000/api/book', {
        userName,
        email,
        movie,
        screen,
        showtime,
        ticketCount: parsedTicketCount,
        
      });

      alert('Ticket booked successfully!');
      onClose();
    } catch (error) {
      console.error('Error booking ticket:', error);

      if (error.response) {
        setError(error.response.data.error || 'Failed to book ticket');
      } else if (error.request) {
        setError('No response from the server. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
     <a className="Home" href="/">Home</a>
   
    <div className="booking-form">
      <h2 className="heading">Book Ticket for {movie}</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label className="names">
          Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <label className="names">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="names">
          No of tickets:
          <input
            type="number"
            value={ticketCount}
            onChange={(e) => setTicketCount(e.target.value)}
            required
            min="1"
          />
        </label>
        <div className="button-group">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Book Ticket'}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default BookingForm;
