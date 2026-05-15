import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Create an AfriChem Procurement Solutions portal account.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
