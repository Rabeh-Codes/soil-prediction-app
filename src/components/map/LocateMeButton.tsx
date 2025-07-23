// src/components/map/LocateMeButton.tsx
import { useState } from 'react';
import { useMap } from '@/components/map/MapContext';
import { FaCrosshairs } from 'react-icons/fa';

interface LocateMeButtonProps {
  onLocate?: () => void;
}

export default function LocateMeButton({ onLocate }: LocateMeButtonProps) {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  const handleLocate = () => {
    if (!map) return;
    setLocating(true);
    map.locate({ setView: true, maxZoom: 14 })
      .on('locationfound', () => setLocating(false))
      .on('locationerror', () => setLocating(false));
    onLocate?.();
  };

  return (
    <button
      onClick={handleLocate}
      title={locating ? 'Locating…' : 'Locate me'}
      className="p-2 bg-gray-900/80 text-white rounded shadow hover:bg-gray-800 active:bg-gray-700 transition"
      disabled={locating}
    >
      <FaCrosshairs className="w-4 h-4" />
    </button>
  );
}
