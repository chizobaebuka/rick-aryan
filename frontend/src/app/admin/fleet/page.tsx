'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FleetMap, type FleetDriver } from '@/components/map/FleetMap';
import api from '@/lib/api';
import type { ApiEnvelope } from '@/types/api.types';

type DispatchRow = {
  id: string;
  dispatchCode: string;
  driverName: string;
  loadDescription: string;
  destinationName: string;
  status: string;
  progressPercent: number;
  vehicle?: { currentLatitude?: string | null; currentLongitude?: string | null };
};

export default function FleetPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const { data } = useQuery({
    queryKey: ['dispatch'],
    queryFn: async () => {
      const { data: env } = await api.get<ApiEnvelope<DispatchRow[]>>('/dispatch');
      return env.data;
    },
  });

  const list = data ?? [];

  const drivers: FleetDriver[] = useMemo(() => {
    return list
      .filter((d) => d.vehicle?.currentLatitude && d.vehicle?.currentLongitude)
      .map((d) => ({
        id: d.id,
        name: d.driverName,
        lat: parseFloat(d.vehicle!.currentLatitude!),
        lng: parseFloat(d.vehicle!.currentLongitude!),
        status: d.status as FleetDriver['status'],
        load: d.loadDescription,
        destination: d.destinationName,
      }));
  }, [list]);

  const fallback: FleetDriver[] = [
    {
      id: 'demo-1',
      name: 'Markus Vane',
      lat: 6.45,
      lng: 3.39,
      status: 'delayed',
      load: 'Sulphuric Acid',
      destination: 'Lagos Terminal A',
    },
    {
      id: 'demo-2',
      name: 'Elena Rodriguez',
      lat: 4.81,
      lng: 7.05,
      status: 'in_transit',
      load: 'Ethanol Grade B',
      destination: 'Port Harcourt Hub',
    },
  ];

  const mapDrivers = drivers.length ? drivers : fallback;

  return (
    <div className="grid gap-4 lg:grid-cols-5 lg:gap-0 lg:border lg:border-white/10 lg:rounded-lg overflow-hidden">
      <div className="lg:col-span-2 border-white/10 lg:border-r p-4 space-y-4 bg-surface-card/50">
        <input
          placeholder="Search driver / load ID"
          className="w-full rounded border border-white/10 bg-surface-dim px-3 py-2 text-xs"
        />
        <div className="space-y-2 max-h-[480px] overflow-y-auto">
          {list.length === 0 &&
            [
              { code: 'RA-99218', name: 'Markus Vane', load: 'Sulphuric Acid', st: 'delayed', pct: 32 },
              { code: 'RA-99221', name: 'Elena Rodriguez', load: 'Ethanol B', st: 'in_transit', pct: 65 },
            ].map((d) => (
              <button
                key={d.code}
                type="button"
                onClick={() => setSelected(d.code)}
                className={`block w-full rounded border-l-4 p-3 text-left text-xs ${
                  d.st === 'delayed' ? 'border-primary-cta bg-surface-card' : 'border-secondary bg-surface-card'
                }`}
              >
                <p className="data-num font-bold text-on-surface">{d.code}</p>
                <p className="text-muted">{d.name}</p>
                <p className="mt-1 text-on-surface">{d.load}</p>
                <div className="mt-2 h-1 overflow-hidden rounded bg-white/10">
                  <div
                    className={d.st === 'delayed' ? 'h-full bg-primary-cta' : 'h-full bg-secondary'}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
              </button>
            ))}
          {list.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelected(d.id)}
              className={`block w-full rounded border-l-4 border-secondary bg-surface-card p-3 text-left text-xs`}
            >
              <p className="data-num font-bold">{d.dispatchCode}</p>
              <p className="text-muted">{d.driverName}</p>
              <p>{d.loadDescription}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 min-h-[420px]">
        <FleetMap drivers={mapDrivers} selectedDriverId={selected ?? undefined} className="!min-h-[420px]" />
        <div className="flex flex-wrap gap-4 border-t border-white/10 bg-surface px-4 py-2 text-[10px] text-muted">
          <span>Total distance 1,420.5 km</span>
          <span>Fuel 842 L</span>
          <span>Avg. delivery 4.2 h</span>
        </div>
      </div>
    </div>
  );
}
