import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg bg-surface-card/90 ghost-border p-5 ${className}`}>{children}</div>
  );
}
