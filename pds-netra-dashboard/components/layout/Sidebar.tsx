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
    <aside className="hidden md:flex md:flex-col md:w-72 px-5 py-6 border-r border-white/40 glass-panel">
      <div className="flex items-center gap-3 pb-5 border-b border-white/40">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-sky-500 text-white flex items-center justify-center text-lg font-semibold shadow-lg">
          PN
        </div>
        <div>
          <div className="text-xl font-semibold font-display tracking-tight">PDS Netra</div>
          <div className="text-xs text-slate-600">State Monitoring Command</div>
        </div>
      </div>
      <nav className="mt-6 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? 'bg-white/90 shadow-sm border border-white/70 font-semibold'
                  : 'text-slate-700 hover:bg-white/70'
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  active ? 'bg-gradient-to-r from-teal-500 to-sky-500' : 'bg-slate-200 group-hover:bg-teal-200'
                }`}
              />
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-5 text-xs text-slate-600 border-t border-white/40">
        PoC build • GSCSCL
        <div className="mt-2 text-[11px] text-slate-500">AI-powered vigilance for 250+ godowns</div>
      </div>
    </aside>
  );
}
