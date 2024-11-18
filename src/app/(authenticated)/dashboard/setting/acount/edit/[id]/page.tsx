import type { Metadata } from 'next';
import type { FC } from 'react';
import PenggunaForm from '@/components/Pengguna/PenggunaForm';

export const metadata: Metadata = {
  title: 'Edit Pengguna',
}

const Page: FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  return <PenggunaForm mode="edit" id={id} />
}

export default Page
