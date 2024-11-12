import type { Metadata } from 'next';
import type { FC } from 'react';
import RoleForm from '@/components/Role/RoleForm';

export const metadata: Metadata = {
  title: 'Edit Role',
}

const Page: FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  return <RoleForm mode="edit" id={id} />
}

export default Page
