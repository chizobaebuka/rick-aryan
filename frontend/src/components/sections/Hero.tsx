'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,87,34,0.08),transparent_50%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-6">
        <div>
          <p className="label-mono mb-4 text-secondary">Chemical Procurement Solutions</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-5xl lg:text-6xl"
          >
            Reliable Chemistry.
            <span className="text-primary-cta glow-primary rounded-sm px-1">Robust Operations.</span>
          </motion.h1>
          <p className="mt-6 max-w-xl text-muted leading-relaxed">
            End-to-end chemical procurement and supply chain management for oil & gas,
            mining, and industrial operations across Africa.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/rfq">
              <Button>Request a Quote</Button>
            </Link>
            <Link href="/services">
              <Button variant="link" className="normal-case!">
                Explore Our Solutions
              </Button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 font-label text-[11px] text-muted">
            <span>• CHEMICAL SOURCING</span>
            <span>• QUALITY ASSURANCE</span>
            <span>• SUPPLY CHAIN EXCELLENCE</span>
          </div>
        </div>

        <motion.svg viewBox="0 0 200 200" className="h-full w-full">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <image
              href="/logo.svg"
              x="10"
              y="10"
              width="180"
              height="180"
            />
          </motion.g>
        </motion.svg>
      </div>
    </section>
  );
}
