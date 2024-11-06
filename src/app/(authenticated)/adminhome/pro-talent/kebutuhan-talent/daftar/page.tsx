import type { Metadata } from 'next';
import type { FC } from 'react';
import TabelKebutuhan from './TabelKebutuhan';

export const metadata: Metadata = {
  title: 'Kebutuhan Talent',
}

const Page: FC = () => {
  return <TabelKebutuhan />
}

export default Page