'use client';

import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Pagination, ConfigProvider, Button, theme } from 'antd';
import { SearchOutlined, LeftOutlined, RightOutlined, ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { PaginationProps, ButtonProps } from 'antd';
import { Metadata } from 'next';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

const { useToken } = theme;

const { Option } = Select;

interface DataType {
  key: string;
  id: string;
  namaSatuanKerja: string;
  namaJabatan: string;
  standarKompetensiJabatan: string;
  jumlahTalentDibutuhkan: number;
  statusJabatan: string;
  statusKritikal: string;
  rasio: string;
  keterangan: string;
}

const NstRowActionButton: React.FC<ButtonProps> = (props) => {
  const { token } = useToken();

  const customToken = {
    ...token,
  };

  const buttonToken = {
    paddingBlock: 8,
    paddingInline: 30,
  };

  return (
    <ConfigProvider
      theme={{
        token: customToken,
        components: {
          Button: buttonToken,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  );
};

const columns = [
  {
    title: 'NO',
    dataIndex: 'key',
    key: 'no',
  },
  {
    title: 'NAMA SATUAN KERJA',
    dataIndex: 'namaSatuanKerja',
    key: 'namaSatuanKerja',
  },
  {
    title: 'NAMA JABATAN',
    dataIndex: 'namaJabatan',
    key: 'namaJabatan',
  },
  {
    title: 'STANDAR KOMPETENSI JABATAN',
    dataIndex: 'standarKompetensiJabatan',
    key: 'standarKompetensiJabatan',
  },
  {
    title: 'JUMLAH TALENT DIBUTUHKAN',
    dataIndex: 'jumlahTalentDibutuhkan',
    key: 'jumlahTalentDibutuhkan',
  },
  {
    title: 'STATUS JABATAN',
    dataIndex: 'statusJabatan',
    key: 'statusJabatan',
    render: (status: DataType['statusJabatan']) => (
      <span className={`px-2 py-1 rounded ${status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {status}
      </span>
    ),
  },
  {
    title: 'STATUS KRITIKAL',
    dataIndex: 'statusKritikal',
    key: 'statusKritikal',
    render: (status: DataType['statusKritikal']) => (
      <span className={`px-2 py-1 rounded ${status === 'Ya' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {status}
      </span>
    ),
  },
  {
    title: 'RASIO',
    dataIndex: 'rasio',
    key: 'rasio',
  },
  {
    title: 'KETERANGAN',
    dataIndex: 'keterangan',
    key: 'keterangan',
  },
  {
    title: 'AKSI',
    key: 'aksi',
    render: (_: any, record: DataType) => (
      <div className="flex space-x-2">
        <Button.Group>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.key)}
            className="text-[#2E7628] border-[#DBDBDE] hover:text-white hover:bg-blue-600"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            className="text-[#626272] border-[#DBDBDE] hover:text-white hover:bg-red-600"
          />
        </Button.Group>
      </div>
    ),
  },
];

const handleEdit = (key: string) => {
  console.log('Edit item with key:', key);
  // Implement edit logic here
};

const handleDelete = (key: string) => {
  console.log('Delete item with key:', key);
  // Implement delete logic here
};

const CustomButton: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface CustomPaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = (props) => {
  const { token } = useToken();

  const customToken = {
    ...token,
    colorPrimary: '#FFFFFF', // You can adjust this to your preferred primary color
    colorText: '#2E7628', // This sets the inactive text color to red
    fontSize: 18,
    fontWeightStrong: 800,
    lineWidth: 0,
  };

  const paginationToken = {
    itemActiveColorText: 'white', // This sets the active text color to white
    itemActiveBg: '#2E7628',
    itemBg: '#F6F6F9',
    itemActiveColorDisabled: '#FFFFFF',
    itemSize: 48,
    // Remove borders
    itemBorderColor: 'transparent',
    itemActiveBorderColor: 'transparent',
    itemLinkBg: 'transparent',
    itemInputBg: 'transparent',
    itemBorderWidth: 0,
  };

  return (
    <ConfigProvider
      theme={{
        token: customToken,
        components: {
          Pagination: paginationToken,
        },
      }}
    >
      <Pagination {...props} />
    </ConfigProvider>
  );
};

const TabelKebutuhan: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<DataType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchData = async (page: number, size: number) => {
    try {
      const response = await api.get(`/v1/kebutuh-talent?page=${page}&pageSize=${size}`);
      const { kebutuhanTalents, count } = response.data;
      const formattedData = kebutuhanTalents.map((item: any, index: number) => ({
        key: ((page - 1) * size + index + 1).toString(),
        id: item.id,
        namaSatuanKerja: getSatuanKerjaName(item.satuanKerjaEnum),
        namaJabatan: getJabatanName(item.namaJabatanEnum),
        standarKompetensiJabatan: item.standarKompetensiJabatan,
        jumlahTalentDibutuhkan: item.jumlahTalentDibutuhkan,
        statusJabatan: getStatusJabatan(item.statusJabatanEnum),
        statusKritikal: getStatusKritikal(item.statusKritikal),
        rasio: item.rasio,
        keterangan: item.keteranganKritikal,
      }));
      setData(formattedData);
      setTotalItems(count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Helper functions to convert enum values to readable strings
  const getSatuanKerjaName = (enum_value: number) => {
    // Implement logic to convert enum to string
    return `Satuan Kerja ${enum_value}`;
  };

  const getJabatanName = (enum_value: number) => {
    // Implement logic to convert enum to string
    return `Jabatan ${enum_value}`;
  };

  const getStatusJabatan = (enum_value: number) => {
    return enum_value === 4 ? 'Aktif' : 'Tidak aktif';
  };

  const getStatusKritikal = (enum_value: number) => {
    return enum_value === 2 ? 'Ya' : 'Tidak';
  };

  return (
    <div className="p-6">
      <div className="flex-col mb-6">
        <div className='flex mb-10 justify-center'>

        <h1 className="text-4xl font-bold">SSO BIRO UMUM</h1>
        </div>
        <div className='flex justify-center'>
          <CustomButton className="text-[#2E7628] mr-5 bg-white border border-gray-300 hover:bg-gray-100" onClick={() => window.location.href = "https://www.facebook.com"}>
            Simonevkin
          </CustomButton>
          <CustomButton className="text-[#2E7628] mr-5 bg-white border border-gray-300 hover:bg-gray-100" onClick={() => window.location.href = "https://www.facebook.com"}>
            Sipintasplus
          </CustomButton>
          <CustomButton 
            className="text-white bg-[#2E7628] hover:bg-green-700"
            onClick={() => router.push('/dashboard/pro-talent/kebutuhan-talent/tambah')}
          >
            Sipensu
          </CustomButton>
        </div>
      </div>

      {/* <div className="flex items-center space-x-4 mb-6 bg-white p-2 rounded-lg">
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64"
        />
        <Select defaultValue="" className="w-48">
          <Option value="">Nama Satuan Kerja</Option>
        </Select>
        <Select defaultValue="" className="w-48">
          <Option value="">Nama Jabatan</Option>
        </Select>
        <Select defaultValue="" className="w-48">
          <Option value="">Status Jabatan</Option>
        </Select>
        <CustomButton className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100">
          <ReloadOutlined className="mr-2" />
          Reset
        </CustomButton>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="mb-6"
        scroll={{ x: 'max-content' }}
      />

      <div className="flex justify-end">
        <CustomPagination 
          current={currentPage}
          total={totalItems}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div> */}
    </div>
  );
};

export default TabelKebutuhan;