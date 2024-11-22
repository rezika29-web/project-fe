import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';

interface BarChartProps {
  data: { category: string; [key: string]: number | string }[]; // Tipe data untuk chart
  dataKey: string; 
  title: string; 
  color: string; 
}

const BarChartComponent: React.FC<BarChartProps> = ({ data, dataKey, title, color }) => {
  return (
    <div className="p-2 bg-white h-auto shadow-md rounded-md mb-6">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={dataKey} fill={color}>
            <LabelList dataKey={dataKey} position="top" className="text-black text-xl" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
