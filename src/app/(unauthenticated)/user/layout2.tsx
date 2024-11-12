"use client";

import { BreadcrumbProvider } from "@/contexts/NstBreadcrumbContext";
import React from "react";
import { Layout } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;

const DashboardLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const CustomButton: React.FC<{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }> = ({ children, className = "", onClick }) => (
    <button
      className={`px-4 py-2 rounded font-semibold transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }

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
        <div className="flex items-center">
          <div className="mr-4 text-right bg-black">
            <CustomButton
              className="text-white bg-[#2E7628] hover:bg-green-700"
              onClick={() => router.push("/login")}
            >
              Login
            </CustomButton>
          </div>
        </div>
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
