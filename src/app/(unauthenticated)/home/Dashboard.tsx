"use client";

import { redirect } from "next/navigation";
import { FormEvent } from "react";
import Image from "next/image";
import { Form, Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useRouter } from 'next/navigation';


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

export default function Dashboard() {
  const router = useRouter();
  return (
    <div className="container flex w-full pl-12">
      <div className="flex-col w-full justify-items-center align-middle bg-white justify-center">

        <h1 style={{color:'black', width:'bold'}}>Home</h1>
        <CustomButton
          className="text-white bg-[#2E7628] hover:bg-green-700"
          onClick={() => router.push("/login")}
        >
          Login
        </CustomButton>
      </div>
    </div>
  );
}
