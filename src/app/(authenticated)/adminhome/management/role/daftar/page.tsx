import type { Metadata } from 'next';
import type { FC } from 'react';
import TabelRole from './TabelRole';

export const metadata: Metadata = {
  title: 'Role',
}

const Page: FC = () => {
  return <TabelRole />
}

export default Page
