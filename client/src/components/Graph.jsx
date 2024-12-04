import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from "axios";
import backendUrl from "../config";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = () => {
  const [graphData, setGraphData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/dashboard`);

        
        
        const monthCounts = {};
        response.data.userBookings.forEach((booking) => {
          const month = new Date(booking.date).toLocaleString('en-US', { month: 'long' }).toUpperCase();
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        });

       
        const labels = Object.keys(monthCounts);
        const data = Object.values(monthCounts);

        setGraphData({ labels, data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: graphData.labels,
    datasets: [
      {
        label: 'Tickets Sold',
        data: graphData.data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Tickets Sold Per Month' },
    },
  };

  return (
    <div>
      {graphData.labels.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Graph;
