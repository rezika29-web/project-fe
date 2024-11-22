"use client";

import { BreadcrumbProvider } from "@/contexts/NstBreadcrumbContext";
import React from "react";
import { Dropdown, Layout, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { signOut } from "next-auth/react";


const { Header, Content } = Layout;

const DashboardLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userInfo = useUserPermissions();

  const router = useRouter();

  interface CustomButtonProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
  }
  
  const CustomButton: React.FC<CustomButtonProps> = ({ className, onClick, children }) => {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  };
  

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  const handleLogout = async () => {
    await signOut();
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="homepage" onClick={() => router.push("/dashboard/management/pengguna/daftar")}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="dashboard" onClick={() => router.push("/adminhome/sso")}>
        Router
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
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
            <div className="text-xs font-bold text-[#92939D]">
              SISTEM LAYANAN BIRO UMUM
            </div>
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
        ) : ''}
        {/* <div className="flex items-center">
            <div className="mr-4 text-right bg-black">
              <CustomButton
                className="text-white bg-[#2E7628] hover:bg-green-700"
                onClick={() => router.push("/login")}
              >
                Login
              </CustomButton>
            </div>
          </div> */}
      </Header>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "blue",
            // borderRadius: borderRadiusLG,
          }}
        >
          <div className="mainContent">{children}</div>
        </Content>
      </Layout>
    </Layout>
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
