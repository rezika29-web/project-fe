'use client';

import { NstAuthWrapper } from '@/components/NstAuthWrapper';
import { BreadcrumbProvider } from '@/contexts/NstBreadcrumbContext';
import { useSession, signOut } from 'next-auth/react';

import React from 'react';
import { Layout, Menu, theme, Avatar, Badge, Breadcrumb, Dropdown } from 'antd';
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
  DownOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useUserPermissions } from "@/hooks/useUserPermissions";



const { Header, Sider, Content } = Layout;

const DashboardLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const userInfo = useUserPermissions();
  console.log("userinfo",userInfo);
  

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/dashboard');
    },
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await signOut();
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="homepage" onClick={() => router.push("/user/home")}>
        Home Page
      </Menu.Item>
      <Menu.Item key="dashboard" onClick={() => router.push("/adminhome/sso")}>
        Router
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const CustomButton: React.FC<{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }> = ({ children, className = "flex", onClick }) => (
    <button
      className={`flex px-4 py-2 rounded font-semibold transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <NstAuthWrapper>
      <Layout className="min-h-screen">
        <Header className="bg-white flex items-center justify-between px-4">
          <div className="flex items-center">
            <Image
              src="/biro-images/logo-pemprov.png"
              alt="Logo Pemprov"
              width={40}
              height={40}
            />
            <div className="ml-4">
              <div className="text-xs font-bold text-[#92939D]">SISTEM LAYANAN BIRO UMUM</div>
              {/* <div className="text-sm font-bold">Badan Pengembangan Sumber Daya Manusia Perhubungan</div> */}
            </div>
          </div>
          {userInfo ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <CustomButton
              className="text-sm px-2 py-1 text-white bg-red-500 hover:bg-red-700 flex items-center"
              onClick={(e) => e.preventDefault()}
            >
              {userInfo?.user.fullName}
              <DownOutlined className="ml-1" />
            </CustomButton>
          </Dropdown>
        ) : (
          <CustomButton
            className="text-sm px-2 py-1 text-white bg-[#2E7628] hover:bg-green-700"
            onClick={() => router.push("/login")}
          >
            Login
          </CustomButton>
        )}
        </Header>
        <Layout>
          {userInfo?.role.roleName === 'Admin' ? (

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
                  key: 'management',
                  label: 'Setting',
                  type: 'group',
                  children: [
                    {
                      key: 'pengguna',
                      icon: <UserOutlined />,
                      label: <Link href="/dashboard/management/pengguna/daftar">Pengguna</Link>,

                    },
                    {
                      key: 'role',
                      icon: <BarChartOutlined />,
                      label: <Link href="/dashboard/management/role/daftar">Role</Link>,
                    },
                  ],
                },
              ]}
            />
          </Sider>
          ):(
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
                  key: 'setting',
                  label: 'Account',
                  type: 'group',
                  children: [
                    {
                      key: 'acount',
                      icon: <UserOutlined />,
                      label: <Link href="/dashboard/setting/acount/daftar">Akun</Link>,
                    },
                  ],
                },
              ]}
            />
          </Sider>
          )}
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <Breadcrumb
              style={{ margin: '16px 0' }}
              items={[
                { title: 'Settings' },
                { title: 'Pengguna' },
                { title: 'Daftar' }
              ]}
            /> */}

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