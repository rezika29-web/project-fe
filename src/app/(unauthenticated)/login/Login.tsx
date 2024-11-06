"use client";

import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import Image from 'next/image';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("datainput", formData);
    
    const result = await signIn("credentials", {
      username: formData.get("nip"),
      password: formData.get("password"),
      redirect: false,
    });
    if (result?.error) {
      // Handle error
    } else {
      router.replace('/adminhome/sso/router');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-indigo-900 bg-cover bg-center" style={{backgroundImage: "url('/biro-images/auth/bendi.jpg')"}}>
      <header className="p-4">
        <Image src="/biro-images/logo-pemprov.png" alt="Logo" width={40} height={40} />

        <h1 className="text-white text-sm">SISTEM SSO BIRO UMUM</h1>
        {/* <h2 className="text-white text-xs">Badan Pengembangan Sumber Daya Manusia Perhubungan</h2> */}
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-5xl flex">
          <div className="w-1/2 bg-white rounded-l-lg shadow-lg p-8" style={{backgroundImage: "url('/bpsdm-images/auth/aura-background.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="flex items-center mb-6">
              <div className="bg-indigo-600 rounded-full p-2 mr-3">
                <Image src="/biro-images/auth/arrow.png" alt="Login" width={24} height={24} />
              </div>
              <h2 className="text-2xl font-bold">Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nip" className="block text-sm font-medium text-gray-700">NIP *</label>
                <input id="nip" name="nip" type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Masukkan NIP" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi *</label>
                <div className="relative">
                  <input id="password" name="password" type="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Masukkan Kata Sandi" />
                </div>
              </div>
              <a href="#" className="block text-sm text-green-600 hover:underline">Lupa Kata Sandi?</a>
              <button type="submit" className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200">Login →</button>
            </form>
          </div>
          <div className="w-1/2 bg-indigo-800 rounded-r-lg p-8 flex flex-col justify-between">
            <div className='flex-col justify-center justify-items-center'>
              <Image src="/biro-images/logo-pemprov.png" alt="Logo PEMPROV" width={100} height={100} />
              <h2 className="text-yellow-400 text-2xl font-bold mt-4">SISTEM INFORMASI SSO BIRO UMUM</h2>
              {/* <p className="text-white text-sm mt-2">BADAN PENGEMBANGAN SUMBER DAYA MANUSIA PERHUBUNGAN</p> */}
            </div>
            {/* <div>
              <p className="text-white text-sm mb-4">KONTAK KAMI</p>
              <div className="flex space-x-4">
                {['phone', 'nip', 'facebook', 'x'].map((icon) => (
                  <div key={icon} className="bg-white p-2 rounded-md">
                    <Image src={`/bpsdm-images/auth/${icon}.png`} alt={icon} width={40} height={40}  />
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </main>

      <footer className="bg-indigo-900 text-white text-xs text-center py-2">
        © Copyright 2024, All Rights Reserved by Biro Umum
      </footer>
    </div>
  );
}