const Table = ({ bookings }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Movie</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id}>
            <td>{booking.userId.name}</td>
            <td>{booking.movieId.name}</td>
            <td>{new Date(booking.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
