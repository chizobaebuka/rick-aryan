import type { ReactNode } from 'react';

const tones = {
  teal: 'border-secondary/50 text-secondary',
  orange: 'border-primary-cta/60 text-primary',
  red: 'border-red-400/50 text-red-300',
  neutral: 'border-white/20 text-muted',
} as const;

export function Badge({
  tone = 'teal',
  children,
  className = '',
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-label uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
