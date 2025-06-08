'use client';

import { AuthContext } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import HeaderDashboard from '@/components/HeaderDashboard';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <HeaderDashboard />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}