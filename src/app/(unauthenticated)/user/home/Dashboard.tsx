"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ParticipantChart from "@/components/ParticipantChart";
import BarChartComponent from "@/components/BarChartComponent";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [facilityData, setFacilityData] = useState([]);
  const [chartNew, setChartNew] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://sipintas-plus.biroumumsumbar.com/api/public/rent")
      .then((response) => {
        // Proses data untuk grafik
        const processedData = response.data
          .map((item: { start: string; jumlah_peserta?: string }) => ({
            date: new Date(item.start).toISOString().slice(0, 7), // Format YYYY-MM
            participants: Math.ceil(parseInt(item.jumlah_peserta || "0") / 10), // Konversi ke satuan puluhan
          }))
          .reduce(
            (
              acc: { date: string; participants: number }[],
              curr: { date: string; participants: number }
            ) => {
              const existing = acc.find((item) => item.date === curr.date);
              if (existing) {
                existing.participants += curr.participants; // Akumulasi jumlah peserta
              } else {
                acc.push(curr);
              }
              return acc;
            },
            [] as { date: string; participants: number }[]
          );
  
        setChartData(processedData);
  
        // Hitung total partisipan
        const total = processedData.reduce(
          (sum: number, item: { participants: number }) =>
            sum + item.participants * 10, // Kalikan kembali dengan 10
          0
        );
        setTotalParticipants(total);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-json-server.typicode.com/rezika29-web/apiChart/fasilitas"
        );
        console.log(response.data);
        
        setFacilityData(response.data); 
      } catch (error) {
        console.error("Error fetching data from API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sipintas-plus.biroumumsumbar.com/api/public/rent-summary"
        );
        console.log(response.data);
        
        setChartNew(response.data); 
      } catch (error) {
        console.error("Error fetching data from API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading data...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex-col mb-6">
        <div className="flex-col mb-10 justify-center">
          
          <div className="flex-row mt-10 justify-center text-center items-center p-4 bg-white w-full shadow-md rounded-md">
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Jumlah Pemanfaatan Ruangan Di Lingkungan Kantor Gubernur Sumatera
              Barat
            </h1>
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Periode Januari - Desember 2024
            </h1>
            <BarChartComponent
              data={facilityData}
              dataKey="jumlah_kegiatan"
              title="Jumlah Kegiatan per Fasilitas"
              color="#8884d8"
            />
          </div>
          <div className="flex-row mt-10 justify-center text-center items-center p-4 bg-white w-full  shadow-md rounded-md">
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Jumlah Pemanfaatan Ruangan Di Lingkungan Kantor Gubernur Sumatera
              Barat
            </h1>
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Periode Januari - Desember 2024
            </h1>
            <BarChartComponent
              data={facilityData}
              dataKey="jumlah_peserta"
              title="Jumlah Peserta per Fasilitas"
              color="#8884d8"
            />
          </div>
          <div className="flex-row justify-center text-center items-center p-4 bg-white w-full shadow-md rounded-md">
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Jumlah Pemanfaatan Ruangan Di Lingkungan Kantor Gubernur Sumatera
              Barat
            </h1>
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Periode September - Desember 2024
            </h1>

            <h2 className="text-2xl font-bold text-center mb-4">
              Total Participants: {totalParticipants}
            </h2>
            <ParticipantChart
              data={chartData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
