'use client';

// import { NstAuthWrapper } from '@/components/NstAuthWrapper';
import { BreadcrumbProvider } from '@/contexts/NstBreadcrumbContext';
// import { useSession, signOut } from 'next-auth/react';

import React from 'react';
import { Layout, Menu, Avatar, Badge, Breadcrumb } from 'antd';
import {
  UserOutlined,
  BarChartOutlined,
  FileSearchOutlined,
  CheckSquareOutlined,
  AimOutlined,
  RotateRightOutlined,
  AppstoreOutlined,
  FormOutlined,
  FileProtectOutlined,
  BellOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
// import { redirect } from 'next/navigation';


const { Header, Sider, Content } = Layout;

const DashboardLayoutContent = ({ children }: { children: React.ReactNode }) => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  // const { data: session, status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/home');
  //   },
  // });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // const handleLogout = async () => {
  //   await signOut({ callbackUrl: '/login' });
  // };

  return (
    // <NstAuthWrapper>
      <Layout className="min-h-screen">
        <Header className="bg-white flex items-center justify-between px-4">
          <div className="flex items-center">
            <Image
              src="/bpsdm-images/logo-bpsdm.png"
              alt="Logo BPSDM"
              width={40}
              height={40}
            />
            <div className="ml-4">
              <div className="text-xs font-bold text-[#92939D]">SISTEM LAYANAN BIRO UMUM</div>
              {/* <div className="text-sm font-bold">Badan Pengembangan Sumber Daya Manusia Perhubungan</div> */}
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <div className="text-xs font-semibold">Admin-BIRO-UMUM</div>
              <div className="text-xs">ADMIN</div>
            </div>
            <Avatar size="large" icon={<UserOutlined />} className="mr-5"/>
            <div className="w-[60px] h-[60px] border border-[#EFF0F1] rounded-lg flex items-center justify-center">
              <Badge count={5}>
                <BellOutlined style={{ fontSize: '20px' }} />
              </Badge>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            width={250}
            style={{
              background: '#1D1E55',
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              style={{ background: '#1D1E55' }}
              defaultSelectedKeys={['kebutuhan-talent']}
              items={[
                {
                  key: 'pro-talent',
                  label: 'PRO TALENT',
                  type: 'group',
                  children: [
                    {
                      key: 'kebutuhan-talent',
                      icon: <BarChartOutlined />,
                      label: 'Kebutuhan Talent',
                    },
                    {
                      key: 'identifikasi-calon-talent',
                      icon: <UserOutlined />,
                      label: 'Identifikasi Calon Talent',
                    },
                    {
                      key: 'pemetaan-talent',
                      icon: <AimOutlined />,
                      label: 'Pemetaan Talent',
                    },
                    {
                      key: 'assessment',
                      icon: <FileSearchOutlined />,
                      label: 'Assessment',
                      children: [
                        {
                          key: 'penilaian-360',
                          icon: <RotateRightOutlined />,
                          label: 'Penilaian 360',
                        },
                        {
                          key: '9box',
                          icon: <AppstoreOutlined />,
                          label: '9Box',
                        },
                        {
                          key: 'skp-dp3',
                          icon: <FormOutlined />,
                          label: 'SKP dan DP3',
                        },
                        {
                          key: 'nilai-assessment',
                          icon: <FileProtectOutlined />,
                          label: 'Nilai Assessment',
                        },
                      ],
                    },
                    {
                      key: 'penetapan-talent',
                      icon: <CheckSquareOutlined />,
                      label: 'Penetapan Talent',
                    },
                  ],
                },
              ]}
            />
          </Sider>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[
                { title: 'Pro Talent' },
                { title: 'Kebutuhan Talent' },
                { title: 'Daftar' }
              ]}
            />

            <div className="mainContent">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    // </NstAuthWrapper>
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