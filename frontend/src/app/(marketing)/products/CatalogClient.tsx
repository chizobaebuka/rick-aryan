'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api.types';
import type { Chemical } from '@/types/chemical.types';
import { Badge } from '@/components/ui/Badge';
import Image from 'next/image';

type ListData = { data: Chemical[]; total: number; page: number; limit: number };
const ITEMS_PER_PAGE = 7;

const demo: Chemical[] = [
  {
    id: '1',
    name: 'KCl - Potassium Chloride',
    casNumber: '7447-40-7',
    formula: 'KCl',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Essential drilling fluid additive for shale inhibition and density control in water-based mud systems.',
  },
  {
    id: '2',
    name: 'Calcium Chloride',
    casNumber: '10043-52-4',
    formula: 'CaCl2',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Water phase salinity controller used to increase density and prevent hydrate formation in drilling fluids.',
  },
  {
    id: '3',
    name: 'XCD polymer',
    casNumber: '11138-66-2',
    formula: 'Polysaccharide',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'High-efficiency viscosifier providing superior suspension and hole cleaning capabilities in water-based systems.',
  },
  {
    id: '4',
    name: 'Xantham gum',
    casNumber: '11138-66-2',
    formula: 'C35H49O29',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Natural polymer used for viscosity enhancement and fluid loss control in drilling and completion fluids.',
  },
  {
    id: '5',
    name: 'Caustic Soda',
    casNumber: '1310-73-2',
    formula: 'NaOH',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'pH control agent essential for maintaining optimal alkalinity in water-based drilling fluids.',
  },
  {
    id: '6',
    name: 'Soda Ash',
    casNumber: '497-19-8',
    formula: 'Na2CO3',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Water softening agent used to treat calcium contamination and maintain fluid properties.',
  },
  {
    id: '7',
    name: 'HEC Liquid',
    casNumber: '9004-62-0',
    formula: 'N/A',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Liquid hydroxyethyl cellulose providing viscosity and fluid loss control in clear brine systems.',
  },
  {
    id: '8',
    name: 'DEG',
    casNumber: '111-46-6',
    formula: 'C4H10O3',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Diethylene glycol used for gas dehydration and hydrate inhibition in pipeline operations.',
  },
  {
    id: '9',
    name: 'MEG',
    casNumber: '107-21-1',
    formula: 'C2H6O2',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Monoethylene glycol for natural gas dehydration and hydrate prevention in production systems.',
  },
  {
    id: '10',
    name: 'TEG',
    casNumber: '112-27-6',
    formula: 'C6H14O4',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Triethylene glycol, the industry standard for deep dehydration of natural gas streams.',
  },
  {
    id: '11',
    name: 'THPS 75%',
    casNumber: '55566-30-8',
    formula: 'N/A',
    category: 'CHEMICALS',
    grade: 'Specialty',
    description: 'Tetrakis hydroxymethyl phosphonium sulfate biocide for controlling sulfate-reducing bacteria.',
  },
  {
    id: '12',
    name: 'Calcium Bromide',
    casNumber: '7789-41-5',
    formula: 'CaBr2',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'High-density brine component for completion and workover fluids requiring superior density performance.',
  },
  {
    id: '13',
    name: 'Emulsifiers',
    casNumber: 'N/A',
    formula: 'N/A',
    category: 'CHEMICALS',
    grade: 'Specialty',
    description: 'Surface-active agents for stabilizing water-in-oil emulsions in invert drilling fluid systems.',
  },
  {
    id: '14',
    name: 'Xylene',
    casNumber: '1330-20-7',
    formula: 'C8H10',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Aromatic solvent for cleaning operations, paraffin removal, and wellbore maintenance applications.',
  },
  {
    id: '15',
    name: 'Organophylic clay',
    casNumber: 'N/A',
    formula: 'N/A',
    category: 'CHEMICALS',
    grade: 'Drilling',
    description: 'Specialized clay for viscosity building and suspension in oil-based and synthetic drilling fluids.',
  },
  {
    id: '16',
    name: 'CMC HV',
    casNumber: '9004-32-4',
    formula: 'N/A',
    category: 'CHEMICALS',
    grade: 'Drilling',
    description: 'High-viscosity carboxymethyl cellulose for fluid loss control and viscosity enhancement.',
  },
  {
    id: '17',
    name: 'Nacl',
    casNumber: '7647-14-5',
    formula: 'NaCl',
    category: 'CHEMICALS',
    grade: 'Technical',
    description: 'Sodium chloride for density control and basic hydrate inhibition in drilling fluids.',
  },
];

export function CatalogClient() {
  const searchParams = useSearchParams();
  const categoryQ = searchParams.get('category') || '';
  const [category, setCategory] = useState(categoryQ || 'ALL');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['catalog', category, search, page],
    queryFn: async () => {
      const { data: envelope } = await api.get<ApiEnvelope<ListData>>('/catalog', {
        params: {
          page,
          limit: ITEMS_PER_PAGE,
          ...(category !== 'ALL' ? { category } : {}),
          ...(search ? { search } : {}),
        },
      });
      return envelope.data;
    },
  });

  const chemicals = useMemo(() => {
    if (!isError && data?.data?.length) return data.data;
    
    let filtered = demo;
    if (category !== 'ALL') {
      filtered = demo.filter(item => item.category === category);
    }
    
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [data, isError, page, category]);

  const totalItems = useMemo(() => {
    if (!isError && data?.total) return data.total;
    
    if (category === 'ALL') return demo.length;
    return demo.filter(item => item.category === category).length;
  }, [data, isError, category]);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 lg:flex-row lg:px-6">
      <aside className="w-full shrink-0 lg:w-56">
        <p className="label-mono mb-4 text-muted">Filter Catalog</p>
        <label className="block text-xs text-muted mb-2">Category</label>
        <div className="flex flex-col gap-2">
          {['ALL', 'CHEMICALS', 'EQUIPMENT'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setPage(1);
              }}
              className={`text-left px-3 py-2 text-sm rounded transition-colors ${
                category === cat ? 'bg-secondary/20 text-secondary' : 'text-muted hover:bg-white/5'
              }`}
            >
              {cat === 'ALL' ? 'Show All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <h1 className="font-display text-3xl font-bold text-on-surface sm:text-4xl">
          Procurement Catalog
        </h1>
        <p className="mt-2 text-sm text-secondary uppercase tracking-widest font-medium">
          Integrated industrial solutions • Nigeria & West Africa
        </p>

        <div className="relative mt-8 border-b border-white/15 pb-2">
          <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or specification..."
            className="w-full bg-transparent pl-8 text-sm text-on-surface placeholder:text-muted focus:outline-none"
          />
        </div>

        {isLoading && <div className="mt-12 text-center text-sm text-muted">Loading results...</div>}

        {!isLoading && chemicals.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <Image 
              src="/logo.svg" 
              alt="No products available" 
              width={80}
              height={24}
              className="spinning-logo opacity-50 mb-4"
            />
            <p className="text-sm text-muted">
              {category === 'EQUIPMENT' ? 'No equipment available at this time. Please check back later.' : 'No chemicals found matching your criteria.'}
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {chemicals.map((c) => (
            <article
              key={c.id}
              onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
              className={`cursor-pointer rounded-xl border transition-all ${
                expandedId === c.id ? 'border-secondary/40 bg-secondary/5' : 'border-white/10 bg-surface-card hover:bg-white/3'
              } p-6`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="label-mono text-[9px] text-muted tracking-[2px] uppercase">
                    {c.category}
                  </span>
                  <h2 className="mt-2 font-heading text-xl font-bold text-on-surface">
                    {c.name}
                  </h2>
                </div>
                {c.formula && c.formula !== 'N/A' && (
                  <Badge tone="teal">{c.formula}</Badge>
                )}
              </div>

              {expandedId === c.id && (
                <div className="mt-6 pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-on-surface/90 leading-relaxed mb-6 italic">
                    {c.description || 'No detailed description available for this product.'}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
                    <div>
                      <dt className="text-muted mb-1">Grade</dt>
                      <dd className="font-medium text-on-surface">{c.grade || 'Standard'}</dd>
                    </div>
                    {c.casNumber && c.casNumber !== 'N/A' && (
                      <div>
                        <dt className="text-muted mb-1">CAS Number</dt>
                        <dd className="font-medium text-on-surface">{c.casNumber}</dd>
                      </div>
                    )}
                    {c.purity && (
                      <div>
                        <dt className="text-muted mb-1">Purity</dt>
                        <dd className="font-medium text-on-surface">{c.purity}</dd>
                      </div>
                    )}
                    {c.viscosity && (
                      <div>
                        <dt className="text-muted mb-1">Viscosity</dt>
                        <dd className="font-medium text-on-surface">{c.viscosity}</dd>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-8 w-8 rounded text-xs font-bold transition-all ${
                  page === i + 1 ? 'bg-secondary text-primary' : 'bg-surface-card text-muted hover:text-on-surface border border-white/10'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
