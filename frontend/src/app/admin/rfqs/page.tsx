'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Calendar, Weight } from 'lucide-react';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api.types';
import type { RFQ } from '@/types/rfq.types';
import { Button } from '@/components/ui/Button';

const COLS = [
  { id: 'new', title: 'New', status: 'new' as const },
  { id: 'in_review', title: 'In review', status: 'in_review' as const },
  { id: 'quoted', title: 'Quoted', status: 'quoted' as const },
];

export default function RFQsPage() {
  const [selected, setSelected] = useState<RFQ | null>(null);

  const { data } = useQuery({
    queryKey: ['rfqs'],
    queryFn: async () => {
      const { data: env } = await api.get<ApiEnvelope<{ data: RFQ[] }>>('/rfqs', {
        params: { page: 1, limit: 100 },
      });
      return env.data.data;
    },
  });

  const rfqs = data ?? [];

  const grouped = useMemo(() => {
    const g: Record<string, RFQ[]> = { new: [], in_review: [], quoted: [] };
    for (const r of rfqs) {
      if (r.status === 'new') g.new.push(r);
      else if (r.status === 'in_review') g.in_review.push(r);
      else if (r.status === 'quoted') g.quoted.push(r);
    }
    return g;
  }, [rfqs]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1 space-y-4">
        <div className="flex gap-4 border-b border-white/10 pb-2 text-xs">
          <span className="border-b-2 border-primary-cta pb-2 font-semibold text-on-surface">
            Kanban board
          </span>
          <span className="text-muted">TDS leads</span>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          {COLS.map((c) => (
            <div
              key={c.id}
              className="min-h-[320px] flex-1 rounded-lg border border-white/10 bg-surface-card/40 p-3"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <p className="font-label text-[10px] text-muted">
                  {c.title.toUpperCase()} · {String(grouped[c.status]?.length ?? 0).padStart(2, '0')}
                </p>
              </div>
              <div className="space-y-2">
                {(grouped[c.status] ?? []).map((rfq) => (
                  <button
                    key={rfq.id}
                    type="button"
                    onClick={() => setSelected(rfq)}
                    className="w-full rounded border border-white/10 bg-surface-dim p-3 text-left text-xs hover:border-white/20"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="data-num font-bold text-secondary">{rfq.rfqCode}</span>
                      {rfq.priority === 'urgent' ? (
                        <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      ) : null}
                    </div>
                    <p className="mt-1 font-medium text-on-surface">{rfq.companyName}</p>
                    <p className="mt-1 line-clamp-2 text-muted">{rfq.productRequested}</p>
                    <div className="mt-2 flex gap-3 text-[10px] text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Weight className="h-3 w-3" />
                        {rfq.quantityMT} MT
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(rfq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selected && (
        <aside className="w-full shrink-0 border border-white/10 bg-surface-card p-4 lg:w-80">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-heading text-sm font-semibold">{selected.rfqCode} Details</h2>
            {selected.priority === 'urgent' ? (
              <span className="rounded bg-primary-cta/20 px-2 py-0.5 text-[9px] font-bold text-primary-cta">
                URGENT
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-sm font-medium">{selected.companyName}</p>
          <p className="mt-1 text-xs text-muted">{selected.location}</p>
          <p className="mt-1 text-xs text-secondary">{selected.contactEmail}</p>
          <div className="mt-4 space-y-2 text-xs">
            <label className="text-muted">Product</label>
            <input
              readOnly
              className="w-full rounded border border-white/10 bg-surface-dim px-2 py-1"
              value={selected.productRequested}
            />
            <label className="text-muted">Quantity (MT)</label>
            <input
              readOnly
              className="w-full rounded border border-white/10 bg-surface-dim px-2 py-1"
              value={selected.quantityMT}
            />
          </div>
          <div className="mt-4">
            <p className="label-mono mb-2 text-[10px] text-secondary">Kinetic logs</p>
            <ul className="space-y-2 text-[10px] text-muted">
              {selected.activityFeed?.map((a, i) => (
                <li key={i}>
                  {a.message} — <span className="text-on-surface">{a.actor}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex gap-2">
            <Button variant="ghost" className="flex-1 text-[10px]!">
              Save draft
            </Button>
            <Button className="flex-1 text-[10px]!">Send quote →</Button>
          </div>
          <button
            type="button"
            className="mt-4 text-[10px] text-muted hover:text-on-surface"
            onClick={() => setSelected(null)}
          >
            Close panel
          </button>
        </aside>
      )}
    </div>
  );
}
