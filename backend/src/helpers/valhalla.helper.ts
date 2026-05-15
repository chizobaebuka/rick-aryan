import axios from 'axios';
import { IValhallaRoute } from '../interfaces/IValhalla';

const VALHALLA_BASE = process.env.VALHALLA_URL || 'https://valhalla1.openstreetmap.de';

export interface Coord {
  lat: number;
  lon: number;
}

export const getRouteFromValhalla = async (
  origin: Coord,
  destination: Coord
): Promise<IValhallaRoute> => {
  const payload = {
    locations: [
      { lon: origin.lon, lat: origin.lat, type: 'break' },
      { lon: destination.lon, lat: destination.lat, type: 'break' },
    ],
    costing: 'truck',
    directions_options: { units: 'kilometers' },
  };

  const response = await axios.post(`${VALHALLA_BASE}/route`, payload);
  const leg = response.data.trip.legs[0];
  const summary = response.data.trip.summary;

  return {
    distanceKm: summary.length,
    durationMinutes: Math.round(summary.time / 60),
    etaISO: new Date(Date.now() + summary.time * 1000).toISOString(),
    encodedPolyline: leg.shape,
  };
};
