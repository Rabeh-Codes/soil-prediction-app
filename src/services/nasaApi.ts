// src/services/nasaApi.ts

const BASE_URL = 'https://power.larc.nasa.gov/api/temporal/daily/point';

interface NasaParams {
  parameter: string;
  lat: number;
  lon: number;
  start: string; // format: YYYYMMDD
  end: string;   // format: YYYYMMDD
}

/**
 * Fetch NASA data based on dynamic parameters
 * @param options - NASA query options
 */
export async function fetchNasaData({ parameter, lat, lon, start, end }: NasaParams) {
  const query = new URLSearchParams({
    parameters: parameter,
    community: 'RE',
    longitude: lon.toString(),
    latitude: lat.toString(),
    start,
    end,
    format: 'JSON',
  });

  const response = await fetch(`${BASE_URL}?${query.toString()}`);
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.statusText}`);
  }

  return await response.json();
}
