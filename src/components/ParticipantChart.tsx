import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ParticipantChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ambil data dari API
    axios.get('http://localhost:8000/api/public/rent') 
      .then((response) => {
        // Proses data untuk grafik
        console.log(response.data);
        
        const processedData = response.data
        .map(item => ({
          date: new Date(item.start).toISOString().slice(0, 7), // Format YYYY-MM
          participants: Math.ceil(parseInt(item.jumlah_peserta || 0) / 10), // Pastikan jumlah_peserta sebagai angka
        }))
        .reduce((acc, curr) => {
          const existing = acc.find(item => item.date === curr.date);
          if (existing) {
            existing.participants += curr.participants; // Akumulasi jumlah peserta
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
        console.log(processedData);
        
        setData(processedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="flex-row justify-center text-center items-center p-4 bg-white w-full shadow-md rounded-md">
      <h1 style={{}} className='mb-10'>Jumlah Pemanfaatan Ruangan Di Lingkungan Kantor Gubernur Sumatera Barat</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Participants (x10)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `${value * 10}`} labelFormatter={(label) => `Month: ${label}`} />
          <Line type="monotone" dataKey="participants" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ParticipantChart;
