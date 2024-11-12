import type { Metadata } from 'next';
import type { FC } from 'react';
import Dashboard from './Dashboard';

export const metadata: Metadata = {
  title: 'Home',
}

const Page: FC = () => {
  return <Dashboard />
}

export default Page;