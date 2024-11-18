import type { Metadata } from 'next';
import type { FC } from 'react';
import PenggunaForm from '@/components/Pengguna/PenggunaForm';

export const metadata: Metadata = {
  title: 'Tambah Pengguna',
}

const Page: FC = () => {
  return <PenggunaForm mode="add" />
}

export default Page