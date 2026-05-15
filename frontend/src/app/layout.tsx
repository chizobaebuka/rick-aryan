import type { Metadata } from 'next';
import {
  Syne,
  Space_Grotesk,
  Space_Mono,
  Roboto_Mono,
  DM_Sans,
} from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'AfriChem Procurement Solutions | Premium Chemical Sourcing & Industrial Supply Africa',
    template: '%s | AfriChem Procurement Solutions',
  },
  description:
    "Specialized procurement of premium drilling chemicals, industrial reagents, and equipment for oil & gas, mining, and manufacturing sectors across Nigeria and West Africa.",
  keywords: [
    'drilling chemicals Africa',
    'chemical procurement Nigeria',
    'industrial chemical supply West Africa',
    'oilfield chemicals sourcing',
    'mining chemicals supplier',
    'industrial reagents Africa',
    'procurement excellence Nigeria',
    'chemical supply chain management',
    'specialty chemicals Africa',
    'industrial equipment procurement',
    'quality chemical sourcing',
    'bulk chemical supply Africa',
    'chemical distribution West Africa',
    'industrial procurement solutions',
    'chemical logistics Nigeria',
  ],
  openGraph: {
    title: 'AfriChem Procurement Solutions — Premium Chemical Sourcing & Industrial Supply',
    description:
      "Leading procurement specialist for drilling chemicals, industrial supplies, and equipment for Africa's oil & gas, mining, and manufacturing sectors.",
    url: 'https://afriChem-procurement.com',
    siteName: 'AfriChem Procurement Solutions',
    locale: 'en_NG',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'AfriChem Procurement Solutions Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AfriChem Procurement Solutions',
    description: 'Premium chemical sourcing and industrial procurement solutions for Africa\'s industrial sectors',
    images: ['/logo.svg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${robotoMono.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full font-body antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
