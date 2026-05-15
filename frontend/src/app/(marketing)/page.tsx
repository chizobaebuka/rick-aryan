import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { ChemicalVault } from '@/components/sections/ChemicalVault';
import { SupplyChain } from '@/components/sections/SupplyChain';
import { ValueProps } from '@/components/sections/ValueProps';
import { CTA } from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ChemicalVault />
      <SupplyChain />
      <ValueProps />
      <CTA />
    </>
  );
}
