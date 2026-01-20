'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { getToken } from '@/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) router.replace('/dashboard/login');
  }, [router]);

  return (
    <div className="app-shell">
      <div className="app-bg" />
      <div className="app-grid" />
      <div className="pointer-events-none absolute -top-24 right-12 h-64 w-64 rounded-full bg-gradient-to-br from-teal-400/40 via-cyan-400/30 to-transparent blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-[-120px] left-[-80px] h-72 w-72 rounded-full bg-gradient-to-tr from-orange-400/40 via-amber-300/30 to-transparent blur-3xl animate-float" />
      <div className="flex min-h-screen relative z-10">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6 lg:p-8 space-y-6 animate-fade-up">{children}</main>
        </div>
      </div>
    </div>
  );
}
