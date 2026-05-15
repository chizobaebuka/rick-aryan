import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Chemical supply, logistics, and technical services.',
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 lg:px-6 lg:py-32 text-center">
      <p className="label-mono mb-2 text-secondary font-medium uppercase tracking-widest">Solutions Portfolio</p>
      <h1 className="font-display text-4xl font-extrabold text-on-surface sm:text-5xl lg:text-6xl mb-12">
        What We Do
      </h1>
      
      <p className="max-w-3xl mx-auto text-lg text-muted leading-relaxed mb-16">
        AfriChem Procurement Solutions provides integrated, end-to-end chemical procurement solutions, connecting international manufacturers with African industrial operations.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
        {[
          { title: 'Strategic Sourcing', desc: 'Sourcing of oilfield materials and industrial equipment from trusted global networks.' },
          { title: 'Drilling & Production', desc: 'Specialized chemical supply for drilling fluids and production enrichment.' },
          { title: 'Tooling & Machinery', desc: 'Procurement of high-precision tools, industrial machinery, and operational equipment.' },
          { title: 'Logistics Coordination', desc: 'End-to-end logistics with full supply chain visibility and optimized delivery.' },
          { title: 'Tail-End Management', desc: 'Managing tail-end spend that keeps your operations efficient and risk-free.' },
          { title: 'On-site Support', desc: 'Personalized procurement and sourcing support directly at project locations.' }
        ].map(s => (
          <div key={s.title} className="p-8 rounded-xl border border-white/15 bg-surface-card hover:border-secondary/30 transition-all">
            <h3 className="font-heading text-xl font-bold text-on-surface mb-3">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 rounded-2xl bg-secondary/5 border border-secondary/20">
        <h2 className="font-display text-2xl font-bold text-on-surface mb-4">Ready to simplify your procurement?</h2>
        <Link href="/rfq" className="inline-block text-secondary hover:text-white underline underline-offset-4 decoration-2 transition-all">
          Initiate a Consultation →
        </Link>
      </div>
    </div>
  );
}
