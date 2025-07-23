// src/components/map/GeoJsonViewer.tsx
import { useEffect, useRef } from 'react';
import type { FeatureCollection } from 'geojson';
import L from 'leaflet';
import { useMap } from '@/components/map/MapContext';

const GEOJSON_URL = '/data/sample.geojson';

const GeoJsonViewer = () => {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    // Cleanup for component unmount
    return () => {
      isMountedRef.current = false;
      if (layerRef.current && map) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    const controller = new AbortController();

    fetch(GEOJSON_URL, { signal: controller.signal })
      .then((res) => res.json())
      .then((json: FeatureCollection) => {
        if (!isMountedRef.current) return;

        // Remove existing layer
        if (layerRef.current) {
          map.removeLayer(layerRef.current);
        }

        // Create new layer with proper typing
        const layer = L.geoJSON(json, {
          pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, { radius: 5 });
          },
          style: (feature) => {
            return { color: '#3388ff', weight: 2 };
          }
        });

        layerRef.current = layer;
        map.addLayer(layer);
        map.fitBounds(layer.getBounds());
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Failed to load GeoJSON:', err);
        }
      });

    // Cleanup for request cancellation
    return () => controller.abort();
  }, [map]);

  return null;
};

export default GeoJsonViewer;