import React from 'react';
import { Pagination, ConfigProvider, theme } from 'antd';
import type { PaginationProps } from 'antd';

const { useToken } = theme;

// Export the interface
export interface NstPaginationProps extends PaginationProps {
  current: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
}

// Export the component
export const NstPagination: React.FC<NstPaginationProps> = (props) => {
  const { token } = useToken();

  const customToken = {
    ...token,
    colorPrimary: '#FFFFFF', // You can adjust this to your preferred primary color
    colorText: '#2E7628', // This sets the inactive text color to red
    fontSize: 18,
    fontWeightStrong: 800,
    lineWidth: 0,
  };

  const paginationToken = {
    itemActiveColorText: 'white', // This sets the active text color to white
    itemActiveBg: '#2E7628',
    itemBg: '#F6F6F9',
    itemActiveColorDisabled: '#FFFFFF',
    itemSize: 48,
    // Remove borders
    itemBorderColor: 'transparent',
    itemActiveBorderColor: 'transparent',
    itemLinkBg: 'transparent',
    itemInputBg: 'transparent',
    itemBorderWidth: 0,
  };

  return (
    <ConfigProvider
      theme={{
        token: customToken,
        components: {
          Pagination: paginationToken,
        },
      }}
    >
      <Pagination {...props} />
    </ConfigProvider>
  );
};
