import type { Metadata } from 'next';
import type { FC } from 'react';
import TabelPengguna from './TabelPengguna';

export const metadata: Metadata = {
  title: 'Pengguna',
}

const Page: FC = () => {
  return <TabelPengguna />
}

export default Page
