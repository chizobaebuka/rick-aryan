import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact AfriChem Procurement Solutions — Port Harcourt, Nigeria.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-3xl font-bold text-on-surface">Contact</h1>
      <p className="mt-6 text-muted leading-relaxed">
        Corporate headquarters: Port Harcourt, Rivers State, Nigeria.
      </p>
      <p className="mt-4 text-muted">
        For procurement requests, please use the{' '}
        <Link href="/rfq" className="text-secondary hover:underline">
          RFQ form
        </Link>
        .
      </p>
    </div>
  );
}
