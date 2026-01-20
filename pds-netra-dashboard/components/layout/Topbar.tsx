'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { clearSession, getUser } from '@/lib/auth';
import type { LoginResponse } from '@/lib/types';

export function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3">
      <div className="font-semibold">PDS Netra Dashboard</div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden sm:block text-sm text-slate-700">
              {user.name ?? user.username}
            </div>
            <Badge variant="outline">{user.role}</Badge>
            <Button
              variant="outline"
              onClick={() => {
                clearSession();
                router.replace('/dashboard/login');
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Badge variant="outline">Not signed in</Badge>
        )}
      </div>
    </header>
  );
}
