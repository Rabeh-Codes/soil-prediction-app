import { useEffect, useState, useRef, useCallback } from 'react';
import L from 'leaflet';
import { useMap } from '@/components/map/MapContext';

interface LayerOption {
  id: string;
  name: string;
  url: string;
  attribution?: string;
}

const LAYERS: LayerOption[] = [
  {
    id: 'esri',
    name: 'Esri Streets',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles © Esri'
  },
  {
    id: 'osm',
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  },
  {
    id: 'dark',
    name: 'Dark',
    url: 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png',
    attribution: '&copy; Stadia Maps'
  }
];

export default function LayerToggle() {
  const map = useMap();
  const [activeLayer, setActiveLayer] = useState<string>('esri');
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // Cleanup function to remove previous layer
  const removePreviousLayer = useCallback(() => {
    if (tileLayerRef.current && map) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }
  }, [map]);

  // Effect to handle layer changes
  useEffect(() => {
    if (!map) return;

    const selected = LAYERS.find(l => l.id === activeLayer) || LAYERS[0];
    
    // Create new tile layer
    const newLayer = L.tileLayer(selected.url, {
      attribution: selected.attribution || ''
    });
    
    // Add to map
    newLayer.addTo(map);
    
    // Remove previous layer
    removePreviousLayer();
    
    // Update ref
    tileLayerRef.current = newLayer;

    // Cleanup on unmount
    return () => {
      if (tileLayerRef.current && map) {
        map.removeLayer(tileLayerRef.current);
      }
    };
  }, [map, activeLayer, removePreviousLayer]);

  // Handle layer change
  const handleLayerChange = useCallback((id: string) => {
    setActiveLayer(id);
  }, []);

  if (!map) return null;

  return (
    <div 
      className="absolute top-4 right-4 z-[1000] bg-white/90 p-2 rounded shadow-md space-y-1"
      aria-label="Map layer controls"
    >
      {LAYERS.map((layer) => (
        <button
          key={layer.id}
          aria-pressed={activeLayer === layer.id}
          className={`block w-full text-left text-sm px-2 py-1 rounded hover:bg-blue-200 transition ${
            activeLayer === layer.id 
              ? 'bg-blue-500 text-white' 
              : 'text-gray-800'
          }`}
          onClick={() => handleLayerChange(layer.id)}
        >
          {layer.name}
        </button>
      ))}
    </div>
  );
}