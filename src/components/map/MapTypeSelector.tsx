// src/components/map/MapTypeSelector.tsx
import { useState } from 'react';
import { FaMapMarkedAlt, FaAngleDoubleRight } from 'react-icons/fa';

export type MapType = 'street' | 'satellite' | 'dark';

interface MapTypeSelectorProps {
  current: MapType;
  onChange: (type: MapType) => void;
}

export default function MapTypeSelector({ current, onChange }: MapTypeSelectorProps) {
  const [open, setOpen] = useState(false);
  const types: MapType[] = ['street', 'satellite', 'dark'];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center space-x-2 bg-gray-900/80 text-white rounded p-2 shadow hover:bg-gray-800"
      >
        <FaMapMarkedAlt />
        <span className="capitalize">{current}</span>
        <FaAngleDoubleRight className={`${open ? 'rotate-90' : ''} transition-transform`} />
      </button>

      {open && (
        <ul className="absolute right-0 mt-1 bg-white rounded shadow w-40">
          {types.map(type => (
            <li key={type}>
              <button
                onClick={() => { onChange(type); setOpen(false); }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
                  current === type ? 'font-semibold bg-blue-50' : ''
                }`}
              >
                {type}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
