'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  companyName: z.string().min(2),
  contactEmail: z.string().email(),
  location: z.string().min(2),
  productRequested: z.string().min(2),
  quantityMT: z.number().positive(),
  deliveryLeadTime: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RFQPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await api.post('/rfqs', values);
      toast.success('RFQ submitted. Our team will respond shortly.');
      reset();
    } catch {
      toast.error('Could not submit RFQ. Ensure the API is running.');
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 lg:px-6">
      <p className="label-mono text-secondary">Procurement</p>
      <h1 className="font-display mt-2 text-3xl font-bold text-on-surface">Request a Quote</h1>
      <p className="mt-2 text-sm text-muted">
        Submit technical requirements — RFQs flow directly into our ERP pipeline.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div>
          <label className="label-mono text-[10px] text-muted">Company</label>
          <input
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...register('companyName')}
          />
        </div>
        <div>
          <label className="label-mono text-[10px] text-muted">Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...register('contactEmail')}
          />
        </div>
        <div>
          <label className="label-mono text-[10px] text-muted">Location</label>
          <input
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...register('location')}
          />
        </div>
        <div>
          <label className="label-mono text-[10px] text-muted">Product</label>
          <input
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...register('productRequested')}
          />
        </div>
        <div>
          <label className="label-mono text-[10px] text-muted">Quantity (MT)</label>
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...register('quantityMT', { valueAsNumber: true })}
          />
        </div>
        <div>
          <label className="label-mono text-[10px] text-muted">Lead time</label>
          <input
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...register('deliveryLeadTime')}
          />
        </div>
        <div>
          <label className="label-mono text-[10px] text-muted">Notes</label>
          <textarea
            rows={3}
            className="mt-1 w-full rounded border border-white/15 bg-surface-card px-3 py-2 text-sm"
            {...register('notes')}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? 'Sending…' : 'Submit RFQ'}
        </Button>
      </form>
    </div>
  );
}
