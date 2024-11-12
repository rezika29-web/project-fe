'use client';

import { NstAuthWrapper } from '@/components/NstAuthWrapper';
import { BreadcrumbProvider } from '@/contexts/NstBreadcrumbContext';
import { useSession, signOut } from 'next-auth/react';

import React from 'react';
import { Layout, theme, Avatar,  } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { redirect } from 'next/navigation';


const { Header, Content } = Layout;

const DashboardLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: session, status } = useSession({
    // const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/dashboard');
    },
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <NstAuthWrapper>
      <Layout className="min-h-screen">
        <Header className="bg-white flex items-center justify-between px-4">
          <div className="flex items-center">
            <Image
              src="/biro-images/logo-pemprov.png"
              alt="Logo BPSDM"
              width={40}
              height={40}
            />
            <div className="ml-4">
              <div className="text-xs font-bold text-[#92939D]">SISTEM MANAGEMENT SSO BIRO UMUM</div>
              {/* <div className="text-sm font-bold">Badan Pengembangan Sumber Daya Manusia Perhubungan</div> */}
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <div className="text-xs font-semibold">Admin-BIRO-UMUM</div>
              <div className="text-xs">ADMIN</div>
            </div>
            <Avatar size="large" icon={<UserOutlined />} className="mr-5" onClick={handleLogout} />
            {/* <div className="w-[60px] h-[60px] border border-[#EFF0F1] rounded-lg flex items-center justify-center">
              <Badge count={5}>
                <BellOutlined style={{ fontSize: '20px' }} />
              </Badge>
            </div> */}
          </div>
        </Header>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >

            <div className="mainContent">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </NstAuthWrapper>
  );
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BreadcrumbProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </BreadcrumbProvider>
  );
}