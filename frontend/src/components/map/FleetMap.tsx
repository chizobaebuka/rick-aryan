'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export type FleetDriver = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'in_transit' | 'loading' | 'delayed' | 'delivered';
  destination: string;
  load: string;
  label?: string;
};

const STATUS_COLORS: Record<string, string> = {
  in_transit: '#2dd4bf',
  loading: '#ffb77d',
  delayed: '#ff8c00',
  delivered: '#64748b',
};

type Props = {
  drivers: FleetDriver[];
  selectedDriverId?: string;
  className?: string;
};

export function FleetMap({ drivers, selectedDriverId, className = '' }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.CircleMarker>>({});

  useEffect(() => {
    if (mapRef.current) return;
    const el = document.getElementById('fleet-map');
    if (!el) return;

    mapRef.current = L.map(el, {
      center: [4.8156, 7.0498],
      zoom: 9,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(mapRef.current);

    L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    drivers.forEach((driver) => {
      const color = STATUS_COLORS[driver.status] || '#ffffff';
      const marker = L.circleMarker([driver.lat, driver.lng], {
        radius: driver.id === selectedDriverId ? 12 : 8,
        fillColor: color,
        color,
        fillOpacity: 0.9,
        weight: driver.id === selectedDriverId ? 3 : 1,
      })
        .addTo(mapRef.current!)
        .bindPopup(
          `<div style="font-family:system-ui,monospace;font-size:12px;background:#1a202a;color:#fff;padding:8px;border-radius:4px;">
            <strong>${driver.name}</strong><br/>
            LOAD: ${driver.load}<br/>
            TO: ${driver.destination}<br/>
            <span style="color:${color}">${driver.status.toUpperCase()}</span>
          </div>`
        );

      markersRef.current[driver.id] = marker;
    });
  }, [drivers, selectedDriverId]);

  return (
    <div
      id="fleet-map"
      className={`w-full min-h-[420px] rounded-md border border-white/10 ${className}`}
    />
  );
}
