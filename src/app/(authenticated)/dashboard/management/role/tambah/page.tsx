import type { Metadata } from 'next';
import type { FC } from 'react';
import RoleForm from '@/components/Role/RoleForm';

export const metadata: Metadata = {
  title: 'Tambah Role',
}

const Page: FC = () => {
  return <RoleForm mode="add" />
}

export default Page