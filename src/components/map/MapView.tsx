import { useEffect, memo, useState, useRef } from 'react';
import { useMapInit, useMapContainer, useMapContext, useIsMapInitialized } from '@/components/map/MapContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FC } from 'react';

// Components
import ZoomControls from './ZoomControls';
import LocateMeButton from './LocateMeButton';
import MouseCoordinates from './MouseCoordinates';
import SearchBox from './SearchBox';
import ScaleBar from './ScaleBar';
import GeoJsonViewer from './GeoJsonViewer';
import LayerToggle from './LayerToggle';

interface MapViewProps {
  selectedOption: string | null;
  sidebarOpen: boolean;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  onMapClick?: (lat: number, lng: number) => void;
}

const MapView: FC<MapViewProps> = ({ selectedOption, onMapClick }) => {
  const { map, setMap } = useMapContext();
  const containerRef = useMapContainer();
  const initMap = useMapInit();
  const isMapInitialized = useIsMapInitialized();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markerRef = useRef<L.Marker | null>(null); 

  useEffect(() => {
    if (!containerRef.current || isMapInitialized || map) return;

    try {
      const mapInstance = initMap({
        center: [36.75, 3.06],
        zoom: selectedOption === 'Single Point' ? 10 : 6,
        zoomControl: false,
        zoomSnap: 0.5, 
        zoomDelta: 0.5, 
      });

     
      const arcGisLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles © Esri',
          maxZoom: 19,
          noWrap: true, 
          bounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)), 
        }
      ).addTo(mapInstance);

      mapInstance.whenReady(() => setIsLoading(false));
      setMap(mapInstance);
    } catch (err) {
      console.error('Map initialization failed:', err);
      setError('Failed to load the map. Please try again');
    }
  }, [containerRef, initMap, isMapInitialized, map, selectedOption, setMap]);

  useEffect(() => {
    if (!map) return;
    map.setView(
      [36.75, 3.06],
      selectedOption === 'Single Point' ? 10 : 6,
      { animate: true, duration: 0.5 }
    );
  }, [selectedOption, map]);

  
  useEffect(() => {
    if (!map || !onMapClick) return;

    const handleMapClick = (e: L.LeafletMouseEvent) => {
     
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      

      markerRef.current = L.marker(e.latlng).addTo(map);
      
     
      onMapClick(e.latlng.lat, e.latlng.lng);
    };

    map.on('click', handleMapClick);

    return () => {
      if (map) {
        map.off('click', handleMapClick);
      }
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
    };
  }, [map, onMapClick]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50 text-red-700 text-center px-4">
        <div>
          <strong className="text-lg">⚠️ {error}</strong>
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />

      {map && (
        <>
          <div className="absolute top-4 left-4 z-[1000] flex flex-col space-y-2">
            <ZoomControls />
            <LocateMeButton />
          </div>

          <div className="absolute top-4 right-4 z-[1000]">
            <SearchBox />
          </div>

          <div className="absolute bottom-4 left-4 z-[1000]">
            <MouseCoordinates />
          </div>

          <div className="absolute bottom-4 right-4 z-[1000]">
            <LayerToggle />
          </div>

          <ScaleBar />
          <GeoJsonViewer />
        </>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-700 font-medium">Loading the map...</p>
        </div>
      )}
    </div>
  );
};

export default memo(MapView);