import { theme } from 'antd';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);

export const customTheme = {
  ...mapToken,
  fontFamily: 'var(--font-source-sans-3)',
};