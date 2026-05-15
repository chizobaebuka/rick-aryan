'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type Form = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPw, setShowPw] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Form) => {
    try {
      await login(values.email, values.password);
      toast.success('Welcome back');
      router.replace('/admin');
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-dim px-4">
      <div className="w-full max-w-sm rounded-lg border border-white/10 bg-surface p-8">
        <p className="font-display text-center text-sm font-bold text-primary-cta">AfriChem</p>
        <p className="text-center text-xs text-muted">Admin / ERP sign in</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label className="text-[10px] text-muted">Email</label>
            <input
              autoComplete="email"
              className="mt-1 w-full rounded border border-white/15 bg-surface-dim px-3 py-2 text-sm"
              {...register('email')}
            />
          </div>
          <div>
            <label className="text-[10px] text-muted">Password</label>
            <div className="relative mt-1">
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                className="w-full rounded border border-white/15 bg-surface-dim py-2 pl-3 pr-10 text-sm"
                {...register('password')}
              />
              <button
                type="button"
                aria-label={showPw ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface"
                onClick={() => setShowPw((v) => !v)}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-4 text-center text-xs">
          <Link href="/signup" className="text-secondary hover:underline">
            Create an account
          </Link>
        </p>
        <div className="mt-6 rounded border border-white/10 bg-surface-dim/80 p-3 text-[10px] leading-relaxed text-muted">
          <p className="font-label text-secondary">Master admin (seeded in development)</p>
          <p className="mt-1 data-num text-on-surface">Email: admin@rickaryan.com</p>
          <p className="data-num text-on-surface">
            Password: set in <code className="text-muted">SEED_ADMIN_PASSWORD</code> (default{' '}
            <code className="text-on-surface">ChangeMe!Strong1</code>)
          </p>
        </div>
      </div>
    </div>
  );
}
