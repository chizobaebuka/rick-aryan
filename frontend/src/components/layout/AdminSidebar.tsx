'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Settings,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const items = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, badge: false },
  { href: '/admin/inventory', label: 'Inventory', icon: Package },
  { href: '/admin/rfqs', label: 'RFQs', icon: FileText, badge: true },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-surface py-6">
      <div className="px-4">
        <p className="font-display text-xs font-bold tracking-wide text-primary-cta">ADMIN CONSOLE</p>
        <p className="mt-1 text-[10px] text-muted">AfriChem Procurement Solutions</p>
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${active ? 'bg-white/10 text-primary-cta' : 'text-muted hover:bg-white/5 hover:text-on-surface'
                }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="rounded bg-primary-cta/20 px-1.5 text-[9px] font-bold text-primary-cta">
                  NEW
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/10 px-4 pt-4">
        <p className="text-[10px] text-muted">Signed in</p>
        <p className="truncate text-xs font-medium text-on-surface">{user?.fullName ?? '—'}</p>
        <p className="truncate font-label text-[10px] text-secondary">{user?.role?.replace(/_/g, ' ')}</p>
      </div>
    </aside>
  );
}
