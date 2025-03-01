import type { Metadata } from 'next';
import type { FC } from 'react';
import RouterSSO from './RouterSSO';

export const metadata: Metadata = {
  title: 'BIRO UMUM',
}

const Page: FC = () => {
  return <RouterSSO />
}

export default Page