import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Compliance, certifications, and technical resources.',
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-3xl font-bold text-on-surface">Resources</h1>
      <p className="mt-6 text-muted leading-relaxed">
        Safety data sheets, compliance documentation, and operational protocols are available on
        request through your account executive or via the RFQ portal.
      </p>
    </div>
  );
}
