import type { Metadata } from 'next';
import type { FC } from 'react';
import FormTambah from './FormTambah';

export const metadata: Metadata = {
  title: 'Tambah Kebutuhan Talent',
}

const Page: FC = () => {
  return <FormTambah />
}

export default Page