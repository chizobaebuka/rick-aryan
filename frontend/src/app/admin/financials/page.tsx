'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api.types';

type Inv = {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amountNGN: string;
  status: string;
};

export default function FinancialsPage() {
  const { data: summary } = useQuery({
    queryKey: ['summary'],
    queryFn: async () => {
      const { data: env } = await api.get<ApiEnvelope<Record<string, number>>>(
        '/financials/summary'
      );
      return env.data;
    },
  });

  const { data: invoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data: env } = await api.get<ApiEnvelope<{ data: Inv[] }>>('/financials/invoices', {
        params: { page: 1, limit: 20 },
      });
      return env.data.data;
    },
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="text-[10px] text-muted">Stock value (est.)</p>
          <p className="data-num mt-1 text-xl text-primary-cta">
            {summary ? `NGN ${summary.totalStockValueNGN.toLocaleString()}` : '—'}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="text-[10px] text-muted">Pending invoices</p>
          <p className="data-num mt-1 text-xl">{summary?.pendingInvoices ?? '—'}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-surface-card p-4">
          <p className="text-[10px] text-muted">Active RFQs</p>
          <p className="data-num mt-1 text-xl text-secondary">{summary?.activeRFQs ?? '—'}</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 text-[10px] text-muted">
            <tr>
              <th className="p-3">Invoice</th>
              <th className="p-3">Client</th>
              <th className="p-3">Amount (NGN)</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {(invoices ?? []).map((i) => (
              <tr key={i.id} className="border-b border-white/5">
                <td className="data-num p-3">{i.invoiceNumber}</td>
                <td className="p-3">{i.clientName}</td>
                <td className="data-num p-3">{Number(i.amountNGN).toLocaleString()}</td>
                <td className="p-3">{i.status}</td>
              </tr>
            ))}
            {!invoices?.length && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted">
                  No invoices
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
