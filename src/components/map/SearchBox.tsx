// src/components/map/SearchBox.tsx
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMap } from '@/components/map/MapContext';


interface SearchBoxProps {
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function SearchBox({ onLocationSelect }: SearchBoxProps) {
  const map = useMap();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim() || !map) return;
    setLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const results = await res.json();
      if (results.length) {
        const { lat, lon } = results[0];
        map.flyTo([+lat, +lon], 14);
        onLocationSelect?.(+lat, +lon);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white rounded shadow p-2">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && search()}
        className="flex-grow px-2 py-1 border rounded focus:outline-none"
        placeholder="Search location..."
      />
      <button onClick={search} disabled={loading} className="p-2 text-gray-600 hover:text-gray-800">
        {loading ? '…' : <FaSearch />}
      </button>
    </div>
  );
}
