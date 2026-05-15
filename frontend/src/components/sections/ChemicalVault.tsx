'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { vaultPreview } from '@/data/vaultPreview';

export function ChemicalVault() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="label-mono mb-2 text-secondary">Industrial Chemical Solutions</p>
            <h2 className="font-display text-3xl font-bold text-on-surface sm:text-4xl">
              Premium Drilling Chemicals & Industrial Supplies
            </h2>
          </div>
          <Link href="/products" className="text-sm text-secondary hover:underline">
            View full catalog →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {vaultPreview.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="group flex h-full flex-col rounded-lg border border-white/10 bg-surface-card p-5 transition-colors hover:border-secondary/30">
                <div className="mb-4 flex items-start justify-between">
                  <span className="font-label text-[10px] text-muted">{c.tag}</span>
                  <span className="h-2 w-2 rounded-sm bg-secondary shadow-[0_0_8px_rgba(0,105,148,0.6)]" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-on-surface">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
