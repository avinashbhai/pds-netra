'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/dashboard/overview', label: 'Overview' },
  { href: '/dashboard/godowns', label: 'Godowns' },
  { href: '/dashboard/alerts', label: 'Alerts' },
  { href: '/dashboard/health', label: 'Health' }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r border-slate-200 bg-white">
      <div className="p-4 border-b border-slate-200">
        <div className="text-lg font-semibold">PDS Netra</div>
        <div className="text-xs text-slate-500">State Monitoring Dashboard</div>
      </div>
      <nav className="p-2">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${active ? 'bg-slate-100 font-medium' : 'hover:bg-slate-50'}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4 text-xs text-slate-500 border-t border-slate-200">
        PoC build • GSCSCL
      </div>
    </aside>
  );
}
