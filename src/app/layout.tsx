"use client";

import type { Metadata } from "next";
import { SessionProvider, signOut } from "next-auth/react";
import { Source_Sans_3 } from "next/font/google";
import "@fontsource/source-sans-3"; // Defaults to weight 400
import { ConfigProvider, Dropdown, Layout, Menu } from "antd";
import { customTheme } from "../styles/antd-custom";
import { customComponents } from "../styles/antd-custom-components";
import "./globals.css";
import Image from "next/image";
import { useUserPermissions } from "@/hooks/useUserPermissions";

import { useRouter } from "next/navigation";
import { DownOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"], // Include the weights you want to use
  variable: "--font-source-sans", // CSS variable to use in Tailwind
});

/* 
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
*/

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const userInfo = useUserPermissions();
  console.log(userInfo);

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

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("hasRefreshed");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard" onClick={() => router.push("/dashboard")}>
        Dashboard
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
            alt="Logo BPSDM"
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

        {/* {userInfo ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <CustomButton
              className="text-sm px-2 py-1 text-white bg-red-500 hover:bg-red-700 flex items-center"
              onClick={(e) => e.preventDefault()}
            >
              {userInfo?.user.firstName} {userInfo?.user.lastName} <DownOutlined className="ml-1" />
            </CustomButton>
          </Dropdown>
        ) : (
          <CustomButton
            className="text-sm px-2 py-1 text-white bg-[#2E7628] hover:bg-green-700"
            onClick={() => router.push("/login")}
          >
            Login
          </CustomButton>
        )} */}
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans.className}>
      <body>
        <SessionProvider>
          <ConfigProvider
            theme={{ token: customTheme, components: customComponents }}
          >
            {children}

            {/* {children} */}
          </ConfigProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
