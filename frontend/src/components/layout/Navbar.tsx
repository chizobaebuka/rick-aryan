'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const productCategories = [
  { href: '/products?category=DRILLING_CHEMICALS', label: 'Drilling Chemicals' },
  { href: '/products?category=INDUSTRIAL_SUPPLIES', label: 'Industrial Supplies' },
  { href: '/products?category=EQUIPMENT', label: 'Equipment' },
];

const links = [
  { href: '/products', label: 'Products', dropdown: true },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/6 bg-surface-dim/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="AfriChem Procurement Solutions" 
            width={180}
            height={68}
            className="h-10 w-auto sm:h-12 filter drop-shadow-sm"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) =>
            l.dropdown ? (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={() => setDd(true)}
                onMouseLeave={() => setDd(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-muted hover:text-on-surface"
                >
                  {l.label}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {dd && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="min-w-[200px] rounded-md border border-white/10 bg-surface py-2 shadow-xl">
                      {productCategories.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block px-4 py-2 text-sm text-on-surface hover:bg-white/5"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted hover:text-on-surface"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/rfq">
            <Button className="py-2! text-xs! sm:text-sm!">Request a Quote</Button>
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-on-surface"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-surface-dim px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-on-surface"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {productCategories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="pl-2 text-sm text-muted"
                onClick={() => setOpen(false)}
              >
                {c.label}
              </Link>
            ))}
            <Link href="/rfq" onClick={() => setOpen(false)}>
              <Button className="w-full">Request a Quote</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
