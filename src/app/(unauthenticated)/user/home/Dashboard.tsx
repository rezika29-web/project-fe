"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ParticipantChart from "@/components/ParticipantChart";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/public/rent")
      .then((response) => {
        // Proses data untuk grafik
        const processedData = response.data
          .map((item) => ({
            date: new Date(item.start).toISOString().slice(0, 7), // Format YYYY-MM
            participants: Math.ceil(parseInt(item.jumlah_peserta || 0) / 10), // Konversi ke satuan puluhan
          }))
          .reduce((acc, curr) => {
            const existing = acc.find((item) => item.date === curr.date);
            if (existing) {
              existing.participants += curr.participants; // Akumulasi jumlah peserta
            } else {
              acc.push(curr);
            }
            return acc;
          }, []);

        setChartData(processedData);

        // Hitung total partisipan
        const total = processedData.reduce(
          (sum, item) => sum + item.participants * 10,
          0
        ); // Kalikan kembali dengan 10
        setTotalParticipants(total);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6">
      <div className="flex-col mb-6">
        <div className="flex mb-10 justify-center">
          <div className="flex-row justify-center text-center items-center p-4 bg-white w-full shadow-md rounded-md">
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Jumlah Pemanfaatan Ruangan Di Lingkungan Kantor Gubernur Sumatera
              Barat
            </h1>

            <h2 className="text-2xl font-bold text-center mb-4">
              Total Participants: {totalParticipants}
            </h2>
            <ParticipantChart
              data={chartData}
              totalParticipants={totalParticipants}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
