import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <p className="font-display text-sm font-bold text-primary-cta">AfriChem Procurement Solutions</p>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            Oilfield chemical supply and logistics from Port Harcourt — precision procurement for
            onshore and offshore campaigns.
          </p>
          <p className="mt-4 text-xs text-muted">
            2018 © 2026 AfriChem Procurement Solutions. All rights reserved.
          </p>
        </div>
        <div>
          <p className="label-mono mb-3 text-secondary">Quick links</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/products" className="hover:text-on-surface">
                Products
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-on-surface">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-on-surface">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-on-surface">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3 text-secondary">Legal</p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/resources" className="hover:text-on-surface">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-on-surface">
                Compliance
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-on-surface">
                Certifications
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-mono mb-3 text-secondary">Address</p>
          <p className="text-sm text-muted leading-relaxed">
            Corporate HQ
            <br />
            Port Harcourt, Rivers State
            <br />
            Nigeria
          </p>
          <div className="mt-4 flex gap-3 text-muted">
            <a
              href="https://www.linkedin.com/in/rick-aryan-8315aa2b2/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-secondary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-secondary">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
