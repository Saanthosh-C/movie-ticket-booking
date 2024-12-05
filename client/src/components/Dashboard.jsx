import React, { useEffect, useState } from "react";
import Graph from "./Graph"; // Ensure Graph is implemented correctly
import axios from "axios";
import "../dashboard.css";

const Dashboard = () => {
  const [totalTickets, setTotalTickets] = useState(0);
  const [soldTickets, setSoldTickets] = useState(0);
  const [availableTickets, setAvailableTickets] = useState(0); // New state for available tickets
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/dashboard")
      .then((response) => {
        const { totalTickets, soldTickets, userBookings } = response.data;
        setTotalTickets(totalTickets || 0);
        setSoldTickets(soldTickets || 0);
        setUserBookings(userBookings || []);
        
        // Calculate available tickets
        const available = totalTickets - soldTickets;
        setAvailableTickets(available < 0 ? 0 : available); // Ensure available tickets are not negative
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="dashboard">
      <a className="Home" href="/">Home</a>
      <h1>Movie Ticket Booking Dashboard</h1>

      <div className="info-section">
        <div className="card">
          <h2>Total Tickets</h2>
          <p>{totalTickets}</p>
        </div>
        <div className="card">
          <h2>Sold Tickets</h2>
          <p>{soldTickets}</p>
        </div>
        <div className="card">
          <h2>Available Tickets</h2> {/* New card for available tickets */}
          <p>{availableTickets}</p>
        </div>
      </div>

      <div className="user-data-section">
        <h2>Users Who Booked Tickets</h2>
        {userBookings && userBookings.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Movie Booked</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((user, index) => (
                <tr key={index}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.movie}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No user bookings available.</p>
        )}
      </div>

      <div className="graph-section">
        <Graph />
      </div>
    </div>
  );
};

export default Dashboard;