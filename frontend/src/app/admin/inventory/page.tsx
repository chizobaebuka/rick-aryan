'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api.types';

type Row = {
  id: string;
  chemical: { name: string };
  assetId?: string;
  stockLevelMT: string;
  reorderLevelMT: string;
  batchNumber: string;
  expiryDate?: string | null;
  status: string;
  fillPercent: number;
};

export default function InventoryPage() {
  const { data, isError } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data: env } = await api.get<ApiEnvelope<{ data: Row[]; total: number }>>('/inventory', {
        params: { page: 1, limit: 50 },
      });
      return env.data;
    },
  });

  const rows = data?.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs text-muted">
            Category: all chemicals · Status: any · Total: {data?.total ?? '—'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="!text-xs">
            Advanced filters
          </Button>
          <Button className="!text-xs">+ Add stock entry</Button>
        </div>
      </div>
      {isError && (
        <p className="text-xs text-muted">Connect to API to load inventory. Showing empty state.</p>
      )}
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full min-w-[800px] text-left text-xs">
          <thead className="border-b border-white/10 bg-surface text-[10px] font-label uppercase tracking-wider text-muted">
            <tr>
              <th className="p-3">Chemical &amp; ID</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Reorder</th>
              <th className="p-3">Batch</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="p-3">
                  <p className="font-medium text-on-surface">{r.chemical?.name}</p>
                  <p className="data-num text-[10px] text-muted">{r.assetId ?? r.id}</p>
                </td>
                <td className="p-3 text-muted">—</td>
                <td className="p-3">
                  <p className="data-num">{r.stockLevelMT} MT</p>
                  <div className="mt-1 h-1 w-24 overflow-hidden rounded bg-white/10">
                    <div
                      className={`h-full ${r.status === 'OK' ? 'bg-secondary' : r.status === 'LOW' ? 'bg-primary-cta' : 'bg-red-500'}`}
                      style={{ width: `${r.fillPercent}%` }}
                    />
                  </div>
                </td>
                <td className="data-num p-3">{r.reorderLevelMT}</td>
                <td className="data-num p-3">{r.batchNumber}</td>
                <td className="data-num p-3">{r.expiryDate ? new Date(r.expiryDate).toLocaleDateString() : '—'}</td>
                <td className="p-3">
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] ${
                      r.status === 'OK'
                        ? 'border-secondary text-secondary'
                        : r.status === 'LOW'
                          ? 'border-primary-cta text-primary-cta'
                          : 'border-red-400 text-red-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted">
                  No rows
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
