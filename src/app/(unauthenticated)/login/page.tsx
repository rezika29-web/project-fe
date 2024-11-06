import type { Metadata } from 'next';
import type { FC } from 'react';
import Login from './Login';

export const metadata: Metadata = {
  title: 'Log In',
}

const Page: FC = () => {
  return <Login />
}

export default Page;