// src/components/map/LayerToggle.tsx
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMap } from '@/components/map/MapContext';

interface LayerOption {
  id: string;
  name: string;
  url: string;
  attribution?: string;
}

const layers: LayerOption[] = [
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
  const [tileLayer, setTileLayer] = useState<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    const selected = layers.find((l) => l.id === activeLayer) || layers[0];

    const newLayer = L.tileLayer(selected.url, {
      attribution: selected.attribution || ''
    });

    newLayer.addTo(map);
    if (tileLayer) {
      map.removeLayer(tileLayer);
    }

    setTileLayer(newLayer);
  }, [map, activeLayer]);

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white/90 p-2 rounded shadow-md space-y-1">
      {layers.map((layer) => (
        <button
          key={layer.id}
          className={`block w-full text-left text-sm px-2 py-1 rounded hover:bg-blue-200 transition ${
            activeLayer === layer.id ? 'bg-blue-500 text-white' : 'text-gray-800'
          }`}
          onClick={() => setActiveLayer(layer.id)}
        >
          {layer.name}
        </button>
      ))}
    </div>
  );
}
