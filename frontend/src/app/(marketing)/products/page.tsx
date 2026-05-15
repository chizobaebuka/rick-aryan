import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CatalogClient } from './CatalogClient';

export const metadata: Metadata = {
  title: 'Oilfield Chemical Catalog',
  description: 'Search by CAS# or chemical name. Technical grades for drilling, completion, and production.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted text-sm">Loading catalog…</div>}>
      <CatalogClient />
    </Suspense>
  );
}
