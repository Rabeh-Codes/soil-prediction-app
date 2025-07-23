import { useEffect, useRef, useState, useCallback } from 'react';
import { useMap } from '@/components/map/MapContext';
import L from 'leaflet';

// إنشاء أيقونة العلامة مرة واحدة فقط
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function ClickMarker() {
  const map = useMap();
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const popupRef = useRef<L.Popup | null>(null);
  const removeButtonRef = useRef<HTMLButtonElement | null>(null);

 
  const removeMarker = useCallback(() => {
    if (markerRef.current && map) {
      map.removeLayer(markerRef.current);
      markerRef.current = null;
    }
    if (popupRef.current && map) {
      map.closePopup(popupRef.current);
      popupRef.current = null;
    }
    setPosition(null);
  }, [map]);

  
  useEffect(() => {
    if (!map) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
      setPosition(e.latlng);
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
      removeMarker();
    };
  }, [map, removeMarker]);

 
  useEffect(() => {
    if (!map || !position) {
      removeMarker();
      return;
    }

    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }
    if (popupRef.current) {
      map.closePopup(popupRef.current);
    }

   
    markerRef.current = L.marker(position, { icon: markerIcon }).addTo(map);

   
    const popupContent = document.createElement('div');
    popupContent.className = 'min-w-[180px] p-2';
    popupContent.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-bold text-sm">Marker Position</h3>
        <button class="text-gray-500 hover:text-red-500 transition-colors" aria-label="Remove marker">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-1 text-xs">
        <span class="font-medium">Latitude:</span>
        <span>${position.lat.toFixed(5)}</span>
        <span class="font-medium">Longitude:</span>
        <span>${position.lng.toFixed(5)}</span>
      </div>
    `;

  
    popupRef.current = L.popup({ offset: [0, -30] })
      .setContent(popupContent)
      .openOn(map);

   
    const removeButton = popupContent.querySelector('button');
    if (removeButton) {
      removeButtonRef.current = removeButton as HTMLButtonElement;
      removeButtonRef.current.onclick = removeMarker;
    }

    
    markerRef.current.on('contextmenu', (e) => {
      e.originalEvent.preventDefault();
      removeMarker();
    });

    return () => {
      if (removeButtonRef.current) {
        removeButtonRef.current.onclick = null;
        removeButtonRef.current = null;
      }
      removeMarker();
    };
  }, [map, position, removeMarker]);

  return null;
}