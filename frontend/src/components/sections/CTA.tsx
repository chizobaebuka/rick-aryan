import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="mx-4 mb-20 overflow-hidden rounded-2xl border border-primary-cta/30 bg-gradient-to-r from-primary-cta to-secondary px-6 py-12 sm:mx-6 lg:mx-auto lg:max-w-7xl lg:px-10">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-black sm:text-3xl">
            Secure Your Chemical Supply Chain
          </h2>
          <p className="mt-2 max-w-xl text-sm text-black/80">
            Partner with Africa&apos;s premier chemical procurement specialists for reliable sourcing,
            quality assurance, and timely delivery of industrial chemicals and equipment.
          </p>
        </div>
        <Link href="/rfq">
          <Button variant="dark" className="border-black/20! bg-black! text-on-surface!">
            Request Chemical Quote
          </Button>
        </Link>
      </div>
    </section>
  );
}
