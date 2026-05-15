'use client';

import { Bell, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

const titles: Record<string, { kicker?: string; title: string }> = {
  '/admin': { kicker: 'Operations oversight', title: 'Command Center' },
  '/admin/inventory': { title: 'Inventory Management' },
  '/admin/fleet': { title: 'Fleet & Dispatch' },
  '/admin/rfqs': { title: 'RFQ & Leads Manager' },
  '/admin/financials': { title: 'Financials' },
  '/admin/users': { title: 'Users' },
  '/admin/settings': { title: 'Settings' },
};

export function AdminTopbar() {
  const pathname = usePathname();
  const meta = titles[pathname] || { title: 'Admin' };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-surface-dim/95 px-6 backdrop-blur">
      <div>
        {meta.kicker ? (
          <p className="font-label text-[10px] uppercase tracking-wider text-secondary">{meta.kicker}</p>
        ) : (
          <p className="font-label text-[10px] uppercase tracking-wider text-muted">
            Industrial ERP · Chemical procurement hub
          </p>
        )}
        <h1 className="font-display text-lg font-bold text-on-surface">{meta.title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded border border-white/10 bg-surface-card px-3 py-1.5 sm:flex">
          <Search className="h-4 w-4 text-muted" />
          <input
            placeholder="Search…"
            className="w-40 bg-transparent text-xs text-on-surface placeholder:text-muted focus:outline-none"
          />
        </div>
        <button type="button" className="rounded border border-white/10 p-2 text-muted hover:text-on-surface">
          <Bell className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="hidden rounded border border-white/20 px-3 py-1.5 text-xs font-semibold text-on-surface sm:block"
        >
          Initiate dispatch
        </button>
      </div>
    </header>
  );
}
