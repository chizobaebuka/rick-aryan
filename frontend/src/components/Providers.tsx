'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { setToken } from '@/lib/auth';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const finish = () => {
      const token = useAuthStore.getState().token;
      if (token) setToken(token);
      setReady(true);
    };

    if (useAuthStore.persist.hasHydrated()) {
      finish();
      return;
    }
    const unsub = useAuthStore.persist.onFinishHydration(finish);
    void useAuthStore.persist.rehydrate();
    return unsub;
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen bg-surface-dim flex items-center justify-center text-muted text-sm font-label">
        Loading…
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-surface-card text-on-surface text-sm',
          style: { background: '#1a202a', color: '#e8edf5' },
        }}
      />
    </QueryClientProvider>
  );
}
