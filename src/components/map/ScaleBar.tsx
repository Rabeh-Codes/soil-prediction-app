// src/components/map/ScaleBar.tsx
import { useEffect, useRef } from 'react';
import { useMap } from '@/components/map/MapContext';
import L from 'leaflet';

export default function ScaleBar() {
  const map = useMap();
  const scaleControlRef = useRef<L.Control.Scale | null>(null);

  useEffect(() => {
    if (!map) return;

    // إنشاء عنصر السلم
    scaleControlRef.current = L.control.scale({
      position: 'bottomleft',
      metric: true,
      imperial: false,
      updateWhenIdle: true,
      maxWidth: 200,
    });

    scaleControlRef.current.addTo(map);

    return () => {
      if (scaleControlRef.current) {
        scaleControlRef.current.remove();
        scaleControlRef.current = null;
      }
    };
  }, [map]);

  return null;
}
