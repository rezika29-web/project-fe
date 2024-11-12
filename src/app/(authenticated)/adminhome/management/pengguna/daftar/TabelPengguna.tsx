"use client";

import React, { useState, useEffect } from 'react';
import { ConfigProvider, Typography, Button, Input, Table, Space, Modal, message, Breadcrumb } from 'antd';
import { SearchOutlined, ReloadOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { NstPagination } from '@/components/NstPagination';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import withAuth from '@/components/withAuth';
import { useUserPermissions } from '@/hooks/useUserPermissions';

const { Title } = Typography;

interface Pengguna {
  key: string;
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  roleName: string;
}

interface PenggunaResponse {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  status: string;
  role: {
    roleName: string;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

const TabelPengguna: React.FC = () => {
  const router = useRouter();
  const userInfo = useUserPermissions();
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState<Pengguna[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');

  const canCreate = userInfo?.permissions['Management - Pengguna']?.create || false;
  const canUpdate = userInfo?.permissions['Management - Pengguna']?.update || false;
  const canDelete = userInfo?.permissions['Management - Pengguna']?.delete || false;

  useEffect(() => {
    fetchData(currentPage, pageSize, searchKeyword);
  }, [currentPage, pageSize, searchKeyword]);

  const fetchData = async (page: number, size: number, keyword: string = '') => {
    try {
      const response = await api.get(`/v1/users?page=${page}&pageSize=${size}${keyword ? `&keyword=${keyword}` : ''}`);
      const { users, count } = response.data;
      const formattedData = users.map((item: PenggunaResponse, index: number) => ({
        key: ((page - 1) * size + index + 1).toString(),
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        phoneNumber: item.phoneNumber,
        status: item.status,
        roleName: item.role.roleName,
      }));
      setData(formattedData);
      setTotalItems(count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchKeyword(searchText);
  };

  const columns = [
    {
      title: 'NO',
      dataIndex: 'key',
      key: 'no',
      width: 70,
    },
    {
      title: 'NAMA LENGKAP',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'ROLE',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let backgroundColor = '';
        let textColor = '';

        switch (status.toLowerCase()) {
          case 'aktif':
            backgroundColor = '#D7FAD1';
            textColor = '#1F9E3D';
            break;
          case 'tidak aktif':
            backgroundColor = '#FCEBEA';
            textColor = '#E5372B';
            break;
        }

        return (
          <span style={{ 
            backgroundColor: backgroundColor, 
            color: textColor,
            padding: '4px 8px', 
            borderRadius: '4px' 
          }}>
            {status}
          </span>
        );
      },
    },
    {
      title: 'AKSI',
      key: 'aksi',
      width: 120,
      render: (_: unknown, record: Pengguna) => (
        <div className="flex space-x-2">
          <Button.Group>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id)}
              className={`text-[#2E7628] border-[#DBDBDE] ${canUpdate ? 'hover:text-white hover:bg-blue-600' : ''}`}
              disabled={!canUpdate}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
              className={`text-[#2E7628] border-[#DBDBDE] ${canDelete ? 'hover:text-white hover:bg-blue-600' : ''}`}
              disabled={!canDelete}
            />
          </Button.Group>
        </div>
      ),
    },
  ];

  const handleEdit = (id: string) => {
    router.push(`/dashboard/management/pengguna/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: 'Apakah Anda yakin ingin menghapus Pengguna ini?',
      icon: <ExclamationCircleOutlined />,
      content: 'Tindakan ini tidak dapat dibatalkan.',
      okText: 'Ya',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await message.loading({
            content: 'Menghapus Pengguna...',
            duration: 2,
          });

          await api.delete(`/v1/users/${id}`);
          await fetchData(currentPage, pageSize, searchKeyword);

          message.success({
            content: 'Pengguna berhasil dihapus',
            duration: 6,
          });
        } catch (error: unknown) {
          const apiError = error as ApiError;
          if (apiError.response?.data?.message) {
            message.error({
              content: `Gagal menghapus: ${apiError.response.data.message}`,
              duration: 6,
            });
          } else {
            message.error({
              content: 'Terjadi kesalahan saat menghapus Pengguna',
              duration: 6,
            });
          }
        }
      },
    });
  };

  const handleTambahBaru = () => {
    router.push('/dashboard/management/pengguna/tambah');
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#2E7628',
            borderRadius: 6,
          },
          components: {
            Button: {
              colorPrimary: '#2E7628',
            },
            Input: {
              colorBorder: '#E5E7EB',
            },
          },
        }}
      >
        <Breadcrumb
          style={{ margin: '16px 0' }}
          items={[
            { title: 'Data' },
            { title: 'Management' },
            { title: 'Pengguna' },
          ]}
        />

        <div className="p-12">
          <div className="flex justify-between items-center mb-6">
            <Title level={2} style={{ margin: 0 }}>Pengguna</Title>
            <Space>
              <Button 
                type="primary" 
                onClick={handleTambahBaru} 
                disabled={!canCreate}
              >
                + Tambah Baru{!canCreate? ' (Tidak ada izin)' : ''}
              </Button>
            </Space>
          </div>

          <div className="flex items-center space-x-4 mb-6 bg-white p-4 rounded-lg">
            <Input
              placeholder="Nama"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 250 }}
            />
            <Button icon={<ReloadOutlined />} onClick={() => {
              setSearchText('');
              setSearchKeyword('');
              fetchData(1, pageSize);
            }}>Reset</Button>
          </div>

          <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false}
            scroll={{ x: 'max-content' }}
            bordered
          />

          <div className="flex justify-end mt-4">
            <NstPagination 
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={(page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              }}
              showSizeChanger={false}
            />
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

export default withAuth(TabelPengguna, 'Management - Pengguna');
