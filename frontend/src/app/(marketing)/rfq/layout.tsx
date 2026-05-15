import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Submit an RFQ for oilfield chemicals and logistics support.',
};

export default function RFQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
