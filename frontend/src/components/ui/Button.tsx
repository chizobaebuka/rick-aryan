import type { ButtonHTMLAttributes, ReactNode } from 'react';

const variants = {
  primary:
    'bg-primary-cta text-on-surface font-semibold hover:brightness-110 shadow-[0_0_20px_rgba(59,130,246,0.25)]',
  ghost: 'border border-white/15 text-on-surface hover:bg-white/5',
  dark: 'bg-surface-dim text-on-surface border border-white/10 hover:bg-surface-card',
  link: 'text-primary underline-offset-4 hover:underline bg-transparent p-0',
} as const;

type Variant = keyof typeof variants;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm transition-all disabled:opacity-50';
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
