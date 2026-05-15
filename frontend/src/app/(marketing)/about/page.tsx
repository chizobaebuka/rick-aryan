import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'AfriChem Procurement Solutions is a leading chemical procurement and supply chain partner for oil & gas and industrial sectors across Africa.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 lg:px-6 lg:py-32">
      <div className="space-y-16">
        <section>
          <p className="label-mono mb-4 text-secondary">Our Story</p>
          <h1 className="font-display text-4xl font-extrabold text-on-surface sm:text-5xl lg:text-6xl">
            About AfriChem Procurement Solutions
          </h1>
          <p className="mt-8 text-lg text-muted leading-relaxed">
            AfriChem Procurement Solutions is a leading chemical procurement and supply chain partner for oil & gas, energy, mining, and manufacturing companies across Nigeria, West Africa, and the wider African market.
          </p>
          <p className="mt-6 text-lg text-muted leading-relaxed">
            We connect international manufacturers with African operations, ensuring uninterrupted access to critical materials and equipment through efficient sourcing, precise execution, and deep market intelligence.
          </p>
        </section>

        <section className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-on-surface">What We Do</h2>
            <p className="mt-4 text-muted leading-relaxed">
              We provide integrated, end-to-end procurement solutions designed to simplify complexity and improve project efficiency.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">• Strategic sourcing of oilfield materials</li>
              <li className="flex items-start gap-2">• Supply of drilling and production chemicals</li>
              <li className="flex items-start gap-2">• Specialized tools and machinery procurement</li>
              <li className="flex items-start gap-2">• End-to-end logistics coordination</li>
              <li className="flex items-start gap-2">• Tail-end spend management</li>
              <li className="flex items-start gap-2">• On-site procurement support</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface-card p-8">
            <h2 className="font-display text-2xl font-bold text-on-surface">Our Commitment</h2>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              We go beyond supply — we deliver clarity, reliability, and confidence, ensuring clients have smooth, efficient access to the materials and equipment that power their operations.
            </p>
            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="font-label text-xs text-secondary uppercase tracking-wider">Verification</p>
              <p className="mt-1 text-sm text-on-surface font-semibold">D-U-N-S Registered Organization</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl font-bold text-on-surface mb-8 text-center">Why AfriChem</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Proven track record with indigenous & multinationals",
              "Strong global sourcing partnerships",
              "Deep understanding of African supply chain",
              "Competitive pricing strategies",
              "Long-term value-driven relationships",
              "Reputation built on consistency & trust"
            ].map(item => (
              <div key={item} className="p-4 rounded-lg bg-surface-dim border border-white/5 text-sm text-muted">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
