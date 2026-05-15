import { Clock, ClipboardList, Shield } from 'lucide-react';

const props = [
  {
    icon: Shield,
    title: 'Dependability',
    body: 'Consistent access to high-quality products through trusted global networks and rigorous sourcing standards.',
  },
  {
    icon: Clock,
    title: 'Operational Efficiency',
    body: 'Streamlined procurement processes and precise execution that keep your critical projects moving without interruption.',
  },
  {
    icon: ClipboardList,
    title: 'Supply Chain Continuity',
    body: 'Resilient, responsive systems tailored to African market dynamics to mitigate risk and guarantee delivery.',
  },
];

export function ValueProps() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 lg:px-6">
        {props.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="rounded-lg border border-white/10 bg-surface-card/80 p-6"
            >
              <div className="mb-4 inline-flex rounded-md border border-primary-cta/40 p-2 text-primary-cta">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-on-surface">{p.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
