'use client';

import React from 'react';
import { Form, Input, Select, Button, ConfigProvider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Option } = Select;
const { TextArea } = Input;

const FormTambah: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Handle form submission
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            controlHeight: 40,
          },
        }
      }}
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/pro-talent/kebutuhan-talent/daftar" className="text-[#2E7628] mr-4">
            <ArrowLeftOutlined className="text-xl" />
          </Link>
          <h1 className="text-2xl font-bold">Tambah Kebutuhan Talent</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">KEBUTUHAN TALENT</h2>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-2 gap-x-6"
          >
            <Form.Item
              name="namaSatuanKerja"
              label="Nama Satuan Kerja"
              rules={[{ required: true, message: 'Pilih satuan kerja' }]}
            >
              <Select placeholder="Pilih satuan kerja">
                <Option value="option1">Option 1</Option>
                <Option value="option2">Option 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="namaJabatan"
              label="Nama Jabatan"
              rules={[{ required: true, message: 'Pilih jabatan' }]}
            >
              <Select placeholder="Pilih jabatan">
                <Option value="jabatan1">Jabatan 1</Option>
                <Option value="jabatan2">Jabatan 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="standarKompetensiJabatan"
              label="Standar Kompetensi Jabatan"
              rules={[{ required: true, message: 'Masukkan standar kompetensi jabatan' }]}
            >
              <Input placeholder="Masukkan standar kompetensi jabatan" />
            </Form.Item>

            <Form.Item
              name="statusJabatan"
              label="Status Jabatan"
              rules={[{ required: true, message: 'Pilih status aktif jabatan' }]}
            >
              <Select placeholder="Pilih status aktif jabatan">
                <Option value="aktif">Aktif</Option>
                <Option value="tidakAktif">Tidak Aktif</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="jumlahTalentDibutuhkan"
              label="Jumlah Talent Dibutuhkan"
              rules={[{ required: true, message: 'Masukkan jumlah talent dibutuhkan' }]}
            >
              <Input type="number" placeholder="Masukkan jumlah talent dibutuhkan" />
            </Form.Item>

            <Form.Item
              name="statusKritikal"
              label="Status kritikal"
              rules={[{ required: true, message: 'Pilih status kritikal' }]}
            >
              <Select placeholder="Pilih status kritikal">
                <Option value="ya">Ya</Option>
                <Option value="tidak">Tidak</Option>
              </Select>
            </Form.Item>

            <Form.Item name="rasio" label="Rasio">
              <Input placeholder="Input rasio" />
            </Form.Item>

            <Form.Item
              name="keteranganKritikal"
              label="Keterangan kritikal"
              rules={[{ required: true, message: 'Masukkan keterangan' }]}
            >
              <TextArea rows={4} placeholder="Masukkan keterangan" />
            </Form.Item>

            <div className="col-span-2 flex justify-end mt-6">
              <Button type="primary" htmlType="submit" className="bg-[#2E7628] hover:bg-[#235e1f]">
                Simpan
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default FormTambah;
