import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import BookingForm from './components/BookingForm';
import Dashboard from './components/Dashboard';
import "./styles.css"

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [viewDashboard, setViewDashboard] = useState(false);

  const handleBook = (movie, screen, showtime) => {
    setBookingDetails({ movie, screen, showtime });
    setShowForm(true);
  };

  function init(){

  }
  useEffect(() =>{
    init()
  })

  return (
    <div className="App">
      {viewDashboard ? (
        <Dashboard />
      ) : (
        <>
          <button className='admin' onClick={() => setViewDashboard(true)}>Admin Dashboard</button>
          {showForm ? (
            <BookingForm
              movie={bookingDetails.movie}
              screen={bookingDetails.screen}
              showtime={bookingDetails.showtime}
              onClose={() => setShowForm(false)}
            />
          ) : (
            <Home onBook={handleBook} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
