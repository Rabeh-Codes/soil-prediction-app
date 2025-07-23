
import { useEffect, useState } from 'react';
import { useMap } from '@/components/map/MapContext';

export default function MouseCoordinates() {
  const map = useMap();
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
    };

    const handleMouseOut = () => {
      setCoordinates(null);
    };

    map.on('mousemove', handleMouseMove);
    map.on('mouseout', handleMouseOut);

    return () => {
      map.off('mousemove', handleMouseMove);
      map.off('mouseout', handleMouseOut);
    };
  }, [map]);

  if (!coordinates) return null;

  return (
    <div className="fixed bottom-16 right-4 z-[1000] bg-blue-900/90 backdrop-blur-sm text-white rounded-md shadow-lg border border-blue-700 font-mono">
      <div className="grid grid-cols-2 gap-2 p-1.5">
        <div className="flex flex-col items-center">
          <div className="text-[0.6rem] text-blue-200 uppercase tracking-wider">Lat</div>
          <div className="text-[0.7rem] font-medium">
            {coordinates.lat.toFixed(5)}°
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="text-[0.6rem] text-blue-200 uppercase tracking-wider">Lng</div>
          <div className="text-[0.7rem] font-medium">
            {coordinates.lng.toFixed(5)}°
          </div>
        </div>
      </div>
    </div>
  );
}
