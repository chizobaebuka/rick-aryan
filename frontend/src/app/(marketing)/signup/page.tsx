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

const schema = z
  .object({
    fullName: z.string().min(2).max(200),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    confirm: z.string().min(8),
  })
  .refine((d) => d.password === d.confirm, { message: 'Passwords must match', path: ['confirm'] });

type Form = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [showPw, setShowPw] = useState(false);
  const {
    register: reg,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Form) => {
    try {
      await register(values.email, values.password, values.fullName);
      toast.success('Account created — sign in at Admin login.');
      router.push('/admin/login');
    } catch {
      toast.error('Could not register (email may already exist).');
    }
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <p className="font-display text-center text-lg font-bold text-primary-cta">Create account</p>
      <p className="mt-1 text-center text-xs text-muted">
        New users get <strong className="text-on-surface">viewer</strong> access. A master admin must
        upgrade your role to use the ERP console.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="text-[10px] text-muted">Full name</label>
          <input
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...reg('fullName')}
          />
        </div>
        <div>
          <label className="text-[10px] text-muted">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...reg('email')}
          />
        </div>
        <div>
          <label className="text-[10px] text-muted">Password (min 8 characters)</label>
          <div className="relative mt-1">
            <input
              type={showPw ? 'text' : 'password'}
              className="w-full rounded border border-white/15 bg-surface-card py-2 pl-3 pr-10 text-sm"
              {...reg('password')}
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
        <div>
          <label className="text-[10px] text-muted">Confirm password</label>
          <input
            type={showPw ? 'text' : 'password'}
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...reg('confirm')}
          />
          {errors.confirm && (
            <p className="mt-1 text-[10px] text-red-400">{errors.confirm.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Creating…' : 'Sign up'}
        </Button>
      </form>
      <p className="mt-6 text-center text-xs text-muted">
        Already have an account?{' '}
        <Link href="/admin/login" className="text-secondary hover:underline">
          Admin login
        </Link>
      </p>
    </div>
  );
}
