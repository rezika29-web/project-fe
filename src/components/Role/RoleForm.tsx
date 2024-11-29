"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Select, Col, Row, Breadcrumb, Spin } from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { notification } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

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

// interface Permission {
//   showMenu: boolean;
//   create: boolean;
//   read: boolean;
//   update: boolean;
//   delete: boolean;
//   export: boolean;
// }

interface RoleData {
  id: string;
  roleName: string;
  description: string;
  status: string;
  // permission: Record<string, Permission>;
}

// interface AccessRightRecord {
//   mainMenu: string;
//   showMenu: boolean;
//   create: boolean;
//   read: boolean;
//   update: boolean;
//   delete: boolean;
//   export: boolean;
// }

const RoleForm: React.FC<RoleFormProps> = ({ id, mode }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<RoleData | null>(null);
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  // const defaultPermissions: Record<string, Permission> = {
  //   "Pengembangan Pegawai - Penyesuaian Ijazah": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Pengembangan Pegawai - Ujian Dinas": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Pengembangan Pegawai - Tugas Belajar": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Pengembangan Pegawai - Pengembangan Kompetensi": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Mutasi - Pindah Instansi": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Mutasi - Pencantuman Gelar Akademik": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Mutasi - Pemberian Penghargaan": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Mutasi - Layanan Kenaikan Pangkat": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Disiplin - Pembinaan Disiplin Pegawai - Usulan UPT": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Disiplin - Pembinaan Disiplin Pegawai - Perceraian": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Disiplin - Hukum Disiplin": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Kebutuhan Talent": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Pemetaan Talent": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Assessment - Penilaian 360": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Assessment - 9Box": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Assessment - SKP dan DP3": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Assessment - Pra Assessment": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Assessment - Nilai Assessment": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Penetapan Talent": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Pola Pembibitan": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Master Data - Pegawai": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Master Data - Satuan Kerja": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Master Data - Jabatan": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },

  //   "Master Data - UPT - Aparatur dan Sekretariat": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Master Data - UPT - Darat": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Master Data - UPT - Laut": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Master Data - UPT - Udara": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },

  //   "Management - Pengguna": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  //   "Management - Role": { showMenu: false, create: false, read: false, update: false, delete: false, export: false },
  // };

  useEffect(() => {
    const fetchData = async () => {
      if (id && mode === 'edit') {
        try {
          setLoading(true);
          const response = await api.get(`/v1/roles/${id}`);
          if (response.status === 200) {
            setInitialData(response.data.role);
            setRoleData(response.data.role);
            form.setFieldsValue(response.data.role);
          }
        } catch (error: unknown) {
          setError('Failed to fetch Role data');
        } finally {
          setLoading(false);
        }
      } else if (mode === 'add') {
        // setRoleData({ id: '', roleName: '', description: '', status: '', permission: defaultPermissions });
        setRoleData({ id: '', roleName: '', description: '', status: ''});
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mode, form]);

  // const handlePermissionChange = (menuKey: string, field: keyof Permission, value: boolean) => {
  //   if (roleData) {
  //     const updatedPermission = { ...roleData.permission };
  //     updatedPermission[menuKey] = { 
  //       ...updatedPermission[menuKey], 
  //       [field]: value 
  //     };
  //     setRoleData({ ...roleData });
  //     // setRoleData({ ...roleData, permission: updatedPermission });
  //   }
  // };

  // const handleColumnShortcut = (field: keyof Permission, checked: boolean) => {
  //   if (roleData) {
  //     const updatedPermission = { ...roleData.permission };
  //     Object.keys(updatedPermission).forEach(menuKey => {
  //       updatedPermission[menuKey][field] = checked;
  //     });
  //     setRoleData({ ...roleData});
  //   }
  // };

  // const accessRightsColumns = [
  //   {
  //     title: () => (
  //       <div>
  //         Main Menu
  //         <Switch
  //           style={{ marginLeft: 8 }}
  //           onChange={(checked) => handleColumnShortcut('showMenu', checked)}
  //         />
  //       </div>
  //     ),
  //     dataIndex: 'mainMenu',
  //     key: 'mainMenu',
  //     render: (text: string, record: AccessRightRecord) => (
  //       <>
  //         <Switch
  //           checked={record.showMenu}
  //           onChange={(checked) => handlePermissionChange(record.mainMenu, 'showMenu', checked)}
  //           style={{ marginRight: 8 }}
  //         />
  //         {text}
  //       </>
  //     ),
  //   },
  //   {
  //     title: () => (
  //       <div style={{ textAlign: 'center' }}>
  //         Create
  //         <Checkbox
  //           style={{ marginLeft: 8 }}
  //           onChange={(e) => handleColumnShortcut('create', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //     dataIndex: 'create',
  //     key: 'create',
  //     render: (value: boolean, record: AccessRightRecord) => (
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <Checkbox
  //           checked={value}
  //           onChange={(e) => handlePermissionChange(record.mainMenu, 'create', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     title: () => (
  //       <div style={{ textAlign: 'center' }}>
  //         Read
  //         <Checkbox
  //           style={{ marginLeft: 8 }}
  //           onChange={(e) => handleColumnShortcut('read', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //     dataIndex: 'read',
  //     key: 'read',
  //     render: (value: boolean, record: AccessRightRecord) => (
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <Checkbox
  //           checked={value}
  //           onChange={(e) => handlePermissionChange(record.mainMenu, 'read', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     title: () => (
  //       <div style={{ textAlign: 'center' }}>
  //         Update
  //         <Checkbox
  //           style={{ marginLeft: 8 }}
  //           onChange={(e) => handleColumnShortcut('update', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //     dataIndex: 'update',
  //     key: 'update',
  //     render: (value: boolean, record: AccessRightRecord) => (
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <Checkbox
  //           checked={value}
  //           onChange={(e) => handlePermissionChange(record.mainMenu, 'update', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     title: () => (
  //       <div style={{ textAlign: 'center' }}>
  //         Delete
  //         <Checkbox
  //           style={{ marginLeft: 8 }}
  //           onChange={(e) => handleColumnShortcut('delete', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //     dataIndex: 'delete',
  //     key: 'delete',
  //     render: (value: boolean, record: AccessRightRecord) => (
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <Checkbox
  //           checked={value}
  //           onChange={(e) => handlePermissionChange(record.mainMenu, 'delete', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //   },
  //   {
  //     title: () => (
  //       <div style={{ textAlign: 'center' }}>
  //         Export
  //         <Checkbox
  //           style={{ marginLeft: 8 }}
  //           onChange={(e) => handleColumnShortcut('export', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //     dataIndex: 'export',
  //     key: 'export',
  //     render: (value: boolean, record: AccessRightRecord) => (
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <Checkbox
  //           checked={value}
  //           onChange={(e) => handlePermissionChange(record.mainMenu, 'export', e.target.checked)}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  // const accessRightsData = roleData
  //   ? Object.entries(roleData.permission).map(([key, value], index) => ({
  //       key: index.toString(),
  //       mainMenu: key,
  //       showMenu: value.showMenu,
  //       create: value.create,
  //       read: value.read,
  //       update: value.update,
  //       delete: value.delete,
  //       export: value.export,
  //     }))
  //   : [];

  const onFinish = async (values: { roleName: string; description: string; status: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Prepare the permission data
    // const permissionData: Record<string, Permission> = {};
    // if (roleData && roleData.permission) {
    //   Object.entries(roleData.permission).forEach(([key, value]) => {
    //     permissionData[key] = {
    //       showMenu: value.showMenu ?? false,
    //       create: value.create ?? false,
    //       read: value.read ?? false,
    //       update: value.update ?? false,
    //       delete: value.delete ?? false,
    //       export: value.export ?? false,
    //     };
    //   });
    // }

    // Combine form values with permission data
    const submitData = {
      ...values,
      // permission: permissionData,
    };

    try {
      let response;
      if (mode === 'add') {
        response = await api.post('/v1/roles', submitData);
      } else {
        response = await api.put(`/v1/roles/${id}`, submitData);
      }

      if (response.status === 200 || response.status === 201) {
        setSuccess(response.data.message);
        form.setFieldsValue(values);
        
        if (mode === 'add') {
          setRedirecting(true);
          
          // Show notification
          notification.success({
            message: 'Success',
            description: (
              <span>
                Berhasil menyimpan data. Mengarahkan ke halaman edit...
                <Spin indicator={<LoadingOutlined style={{ marginLeft: 8 }} spin />} />
              </span>
            ),
            placement: 'topRight',
            duration: 4,
          });

          // Redirect after a short delay
          setTimeout(() => {
            router.push(`/dashboard/management/role/edit/${response.data.id}`);
          }, 4000);
        } else {
          // Show notification for edit mode
          notification.success({
            message: 'Success',
            description: response.data.message,
            placement: 'topRight',
            duration: 4,
          });
        }
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
          colorPrimary: '#2f772c',
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
          { title: 'Role' },
          { title: mode === 'add'? 'Tambah' : 'Edit' },
        ]}
      />
      
      <div className="p-12">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <Link href="/dashboard/management/role/daftar">
            <ArrowLeftOutlined 
              style={{ fontSize: '18px', marginRight: '8px', cursor: 'pointer' }} 
              onClick={() => router.push('/dashboard/management/role/daftar')}
            />
          </Link>
          <Title level={4} style={{ margin: 0 }}>{mode === 'add' ? 'Tambah' : 'Edit'} Role</Title>
        </div>


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

        <Card
          title={`${mode === 'add' ? 'TAMBAH' : 'EDIT'} ROLE`}
          extra={<span style={{ cursor: 'pointer' }}>▼</span>}
          style={{ width: '100%', marginBottom: '16px' }}
        >
          <Form 
            form={form} 
            layout="vertical" 
            onFinish={onFinish}
            initialValues={initialData || {}}
            id="roleForm"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="roleName"
                  label={<span style={{ color: '#000000' }}>Nama Role</span>}
                  rules={[{ required: true, message: 'Nama Role is required' }]}
                >
                  <Input placeholder="Masukkan nama role" disabled={!!success} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="status"
                  label={<span style={{ color: '#000000' }}>Status</span>}
                  rules={[{ required: true, message: 'Status is required' }]}
                >
                  <Select placeholder="Pilih status" disabled={!!success}>
                    <Select.Option value="Aktif">Aktif</Select.Option>
                    <Select.Option value="Tidak Aktif">Tidak Aktif</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="description"
                  label={<span style={{ color: '#000000' }}>Deskripsi</span>}
                  rules={[{ required: true, message: 'Deskripsi is required' }]}
                >
                  <TextArea rows={4} placeholder="Masukkan deskripsi" disabled={!!success} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* <Card
          title="HAK AKSES"
          extra={<span style={{ cursor: 'pointer' }}>▼</span>}
          style={{ width: '100%', marginBottom: '16px' }}
        >
          <Table
            columns={accessRightsColumns}
            dataSource={accessRightsData}
            pagination={false}
            bordered
          />
        </Card> */}

        <Button 
          type="primary" 
          htmlType="submit" 
          size="large" 
          style={{ float: 'right', marginTop: '16px' }}
          loading={loading || redirecting}
          form="roleForm"
          disabled={redirecting}
          className="mb-12"
        >
          {redirecting ? 'Redirecting...' : 'Simpan'}
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default RoleForm;
