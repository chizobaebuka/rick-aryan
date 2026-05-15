'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminTopbar } from '@/components/layout/AdminTopbar';
import { Button } from '@/components/ui/Button';

const ERP_ROLES = new Set(['master_admin', 'ops_manager', 'supervisor', 'driver']);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    if (!isAuthenticated) router.replace('/admin/login');
  }, [pathname, isAuthenticated, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-dim text-muted text-sm">
        Redirecting…
      </div>
    );
  }

  if (user && !ERP_ROLES.has(user.role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-dim px-6 text-center">
        <p className="max-w-md text-sm text-muted">
          Signed in as <span className="text-on-surface">{user.email}</span> with{' '}
          <span className="font-label text-secondary">{user.role}</span> access. The ERP console requires an
          operations role — ask a master admin to upgrade your account.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button variant="ghost">Back to website</Button>
          </Link>
          <Button
            variant="primary"
            onClick={() => {
              logout();
              router.replace('/admin/login');
            }}
          >
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-surface-dim">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
