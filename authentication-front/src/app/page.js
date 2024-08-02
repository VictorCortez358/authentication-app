'use client'
import React from "react";
import Login from "../components/LoginForm.jsx";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";


export default function Home() {
  const router = useRouter();
  const token = Cookies.get('authToken');

  if (token) {
    router.push('/profile');
  }

  return (
    <main className="flex min-h-screen flex-col lg:items-center lg:justify-center">
      <Login />
    </main>
  );
}
