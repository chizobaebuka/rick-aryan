'use client';

import { motion } from 'framer-motion';
import { Warehouse, FlaskConical, Truck, MapPin, Anchor } from 'lucide-react';

const steps = [
  { icon: Warehouse, label: 'Strategic Sourcing', sub: 'GLOBAL NETWORKS' },
  { icon: FlaskConical, label: 'Oilfield Supply', sub: 'DRILLING & PRODUCTION', active: true },
  { icon: Truck, label: 'Logistics', sub: 'END-TO-END COORD' },
  { icon: MapPin, label: 'Tail-end Spend', sub: 'MANAGED SUPPORT' },
  { icon: Anchor, label: 'On-site Delivery', sub: 'FINAL MILE' },
];

export function SupplyChain() {
  return (
    <section className="border-y border-white/10 bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <p className="label-mono mb-2 text-secondary">Logistical architecture</p>
        <h2 className="font-display text-3xl font-bold text-on-surface sm:text-4xl">
          Supply Chain Integrity
        </h2>
        <div className="relative mt-14 overflow-x-auto pb-6">
          <svg
            className="absolute left-8 right-8 top-8 hidden h-1 sm:block"
            preserveAspectRatio="none"
            viewBox="0 0 800 4"
          >
            <motion.line
              x1="0"
              y1="2"
              x2="800"
              y2="2"
              stroke="url(#grad)"
              strokeWidth="2"
              strokeDasharray="400"
              initial={{ strokeDashoffset: 400 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex min-w-[640px] justify-between gap-2 sm:min-w-0">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex flex-col items-center text-center">
                  <div
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 ${
                      s.active
                        ? 'border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(45,212,191,0.45)] animate-pulse-glow'
                        : 'border-primary-cta/40 bg-surface-dim text-primary'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-3 max-w-[100px] font-heading text-xs font-medium text-on-surface">
                    {s.label}
                  </p>
                  {s.sub ? (
                    <p className="mt-1 font-label text-[9px] text-secondary">{s.sub}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
