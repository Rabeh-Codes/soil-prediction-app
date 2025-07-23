// src/components/map/MapResizer.tsx

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface MapResizerProps {
  dependency: any; // example: sidebarOpen
}

export default function MapResizer({ dependency }: MapResizerProps) {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
      console.log("✅ Map resized due to layout change");
    }, 500); // give time for sidebar transition to finish

    return () => clearTimeout(timeout);
  }, [dependency]);

  return null;
}
