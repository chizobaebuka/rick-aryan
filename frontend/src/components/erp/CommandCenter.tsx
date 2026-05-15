'use client';

import { useQuery } from '@tanstack/react-query';
import { FleetMap, type FleetDriver } from '@/components/map/FleetMap';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api.types';

type Summary = {
  totalStockValueNGN: number;
  activeRFQs: number;
  activeRFQsUnreadHint: number;
  trucksDeployed: number;
  totalTrucks: number;
  fleetUtilizationPercent: number;
  pendingInvoices: number;
};

const demoDrivers: FleetDriver[] = [
  {
    id: '1',
    name: 'FLT-992-ARC',
    lat: 4.85,
    lng: 7.12,
    status: 'in_transit',
    load: 'Chemicals transit',
    destination: 'Port Harcourt cluster',
  },
  {
    id: '2',
    name: 'Asset B',
    lat: 4.78,
    lng: 6.95,
    status: 'loading',
    load: 'Heavy fleet',
    destination: 'Lagos corridor',
  },
];

export function CommandCenter() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: async () => {
      const { data: env } = await api.get<ApiEnvelope<Summary>>('/financials/summary');
      return env.data;
    },
  });

  const s = data;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="label-mono text-[10px] text-muted">Total stock value</p>
          <p className="data-num mt-2 text-2xl font-bold text-primary-cta">
            {s ? `NGN ${s.totalStockValueNGN.toLocaleString()}` : '—'}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="label-mono text-[10px] text-muted">Active RFQs</p>
          <p className="data-num mt-2 text-2xl font-bold text-on-surface">{s?.activeRFQs ?? '—'}</p>
          {s ? (
            <p className="mt-1 text-[10px] text-primary-cta">UNREAD +{s.activeRFQsUnreadHint}</p>
          ) : null}
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="label-mono text-[10px] text-muted">Trucks deployed</p>
          <p className="data-num mt-2 text-2xl font-bold text-secondary">
            {s ? `${s.trucksDeployed} / ${s.totalTrucks}` : '—'}
          </p>
          {s ? (
            <p className="mt-1 text-[10px] text-muted">{s.fleetUtilizationPercent}% utilization</p>
          ) : null}
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="label-mono text-[10px] text-muted">Pending invoices</p>
          <p className="data-num mt-2 text-2xl font-bold text-on-surface">{s?.pendingInvoices ?? '—'}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-surface-card">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <p className="font-label text-[10px] text-secondary">Port Harcourt cluster · 4.8156° N, 7.0498° E</p>
          <span className="rounded border border-secondary/40 px-2 py-0.5 font-label text-[9px] text-secondary">
            SYSTEM ONLINE
          </span>
        </div>
        <FleetMap drivers={demoDrivers} className="!rounded-none !border-0 min-h-[320px]" />
        <div className="flex flex-wrap gap-4 border-t border-white/10 px-4 py-2 text-[10px] text-muted">
          <span>
            <span className="text-primary-cta">●</span> Chemicals transit: 84
          </span>
          <span>
            <span className="text-secondary">●</span> Heavy fleet: 12
          </span>
          <span>
            <span className="text-muted">●</span> Offline: 02
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="label-mono mb-3 text-secondary">System activity</p>
          <ul className="space-y-3 text-xs">
            <li className="flex gap-3">
              <span className="data-num text-muted">14:22:01</span>
              <div>
                <p className="text-primary-cta">Fleet dispatch: FLT-992-ARC</p>
                <p className="text-muted">Route: PH hub → offshore staging</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="data-num text-muted">13:58:45</span>
              <div>
                <p className="text-secondary">Incoming RFQ: #RAS-4402</p>
                <p className="text-muted">Shell Petroleum Development Company</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="label-mono mb-3 text-secondary">Critical stock levels</p>
          <div className="space-y-3">
            {[
              { name: 'Demulsifier Type-A', pct: 12, tone: 'bg-primary-cta' },
              { name: 'Biocide X-Series', pct: 18, tone: 'bg-primary-cta' },
              { name: 'Scale inhibitor', pct: 34, tone: 'bg-secondary' },
            ].map((r) => (
              <div key={r.name}>
                <div className="flex justify-between text-[11px]">
                  <span>{r.name}</span>
                  <span className="data-num text-muted">{r.pct}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded bg-white/10">
                  <div className={`h-full ${r.tone}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded border border-white/20 py-2 font-label text-[10px] text-on-surface hover:bg-white/5"
          >
            Generate reorder form
          </button>
        </div>
      </div>
    </div>
  );
}
