"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Select, Col, Row, Breadcrumb } from 'antd';
import { ArrowLeftOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const { Title } = Typography;
const { Option } = Select;

interface Role {
  id: string;
  roleName: string;
  status: string;
}

interface RoleFormProps {
  id?: string;
  mode: 'add' | 'edit';
}

interface ApiError {
  response?: {
    status: number;
    data: {
      message: string;
    };
  };
}

interface User {
  fullName: string;
  nip: string;
  roleId: string;
  phoneNumber: string;
  status: string;
  password: string;
}

const RoleForm: React.FC<RoleFormProps> = ({ id, mode }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('/v1/roles/all');
        if (response.status === 200) {
          setRoles(response.data.roles);
        }
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (id && mode === 'edit') {
        try {
          setLoading(true);
          const response = await api.get(`/v1/users/${id}`);
          if (response.status === 200) {
            setInitialData(response.data.user);
            form.setFieldsValue({
              fullName: response.data.user.fullName,
              nip: response.data.user.nip,
              roleId: response.data.user.roleId,
              phoneNumber: response.data.user.phoneNumber,
              status: response.data.user.status,
            });
          }
        } catch (error: unknown) {
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id, mode, form]);

  const onFinish = async (values: User) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let response;
      if (mode === 'add') {
        
        response = await api.post('/v1/users', {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          status: values.status,
          nip: values.nip,
          password: values.password,
          roleId: values.roleId,
        });
      } else {
        console.log("value",values);
        response = await api.put(`/v1/users/${id}`, {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          status: values.status,
          nip: values.nip,
          password: values.password,
          roleId: values.roleId,
        });
      }

      if (response.status === 200 || response.status === 201) {
        setSuccess(response.data.message);
        form.setFieldsValue(values);
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError.response && apiError.response.status === 400) {
        setError(apiError.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4338CA',
          borderRadius: 8,
        },
        components: {
          Card: {
            headerBg: '#FFFFFF',
            headerFontSize: 18,
          },
          Button: {
            colorPrimary: '#15803D',
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
          { title: mode === 'add'? 'Tambah' : 'Edit' },
        ]}
      />
      
      <div className="p-12">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Link href="/dashboard/management/pengguna/daftar">
            <ArrowLeftOutlined 
              style={{ fontSize: '18px', marginRight: '8px', cursor: 'pointer' }} 
              onClick={() => router.push('/dashboard/management/pengguna/daftar')}
            />
          </Link>
          <Title level={4} style={{ margin: 0 }}>{mode === 'add' ? 'Tambah' : 'Edit'} Pengguna</Title>
        </div>
        <Card
          title={`${mode === 'add' ? 'TAMBAH' : 'EDIT'} PENGGUNA`}
          extra={<span style={{ cursor: 'pointer' }}>▼</span>}
          style={{ width: '100%' }}
        >
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          )}
          {success && (
            <Alert
              message={success}
              type="success"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          )}
          <Form 
            form={form} 
            layout="vertical" 
            onFinish={onFinish}
            initialValues={initialData ?? {}}
            id="roleForm"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label={<span style={{ color: '#000000' }}>Nama Pengguna</span>}
                  rules={[{ required: true, message: 'Nama Pengguna is required' }]}
                >
                  <Input placeholder="Masukkan nama pengguna" disabled={!!success} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nip"
                  label={<span style={{ color: '#000000' }}>NIP</span>}
                  rules={[
                    { required: true, message: 'nip is required' },
                    // { type: 'number', message: 'Please enter a valid nip' }
                  ]}
                >
                  <Input placeholder="Masukkan NIP" disabled={!!success} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="roleId"
                  label={<span style={{ color: '#000000' }}>Role</span>}
                  rules={[{ required: true, message: 'Role is required' }]}
                >
                  <Select placeholder="Pilih role" disabled={!!success}>
                    {roles.map((role) => (
                      <Option key={role.id} value={role.id}>
                        {role.roleName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label={<span style={{ color: '#000000' }}>Nomor Telepon</span>}
                  rules={[{ required: true, message: 'Nomor Telepon is required' }]}
                >
                  <Input placeholder="Masukkan nomor telepon" disabled={!!success} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label={<span style={{ color: '#000000' }}>Password</span>}
                  rules={[{ required: mode === 'add', message: 'Password is required' }]}
                >
                  <Input.Password
                    placeholder="Masukkan password"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    disabled={!!success}
                    autoComplete='new-password'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label={<span style={{ color: '#000000' }}>Status</span>}
                  rules={[{ required: true, message: 'Status is required' }]}
                >
                  <Select placeholder="Pilih status" disabled={!!success}>
                    <Option value="Aktif">Aktif</Option>
                    <Option value="Tidak Aktif">Tidak Aktif</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Button 
          type="primary" 
          htmlType="submit" 
          size="large" 
          style={{ float: 'right', marginTop: '16px' }}
          loading={loading}
          disabled={!!success}
          form="roleForm"
        >
          Simpan
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default RoleForm;