'use client';

import React, {  useEffect } from 'react';
// import { theme } from 'antd';
// import { useRouter } from 'next/navigation';

// const { useToken } = theme;

const CustomButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
const RouterSSO: React.FC = () => {
  // const router = useRouter();
  useEffect(() => {
    const hasRefreshed = localStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      localStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    } 
    // else {
    //   localStorage.removeItem('hasRefreshed');
    // }
  }, []);

  return (
    <div className="p-6">
      <div className="flex-col mb-6">
        <div className='flex mb-10 justify-center'>

        <h1 className="text-4xl font-bold">SISTEM LAYANAN BIRO UMUM</h1>
        </div>
        <div className='flex justify-center'>
          <CustomButton className="text-[#2E7628] mr-5 bg-white border border-gray-300 hover:bg-gray-100" onClick={() => window.open("https://simonevkin.setdaprovsumbar.com/login.php", "_blank")}>
            Simonevkin
          </CustomButton>
          <CustomButton className="text-[#2E7628] mr-5 bg-white border border-gray-300 hover:bg-gray-100" onClick={() => window.open("https://sipintasplus.setdaprovsumbar.com/", "_blank")}>
            Sipintasplus
          </CustomButton>
          <CustomButton className="text-[#2E7628] mr-5 bg-white border border-gray-300 hover:bg-gray-100" onClick={() => window.open("https://sispensubiroumum.sumbarprov.go.id/", "_blank")}>
          Sispensu
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default RouterSSO;