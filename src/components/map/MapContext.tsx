/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type MutableRefObject } from 'react';
import L from 'leaflet';

declare global {
  interface Window { chrome?: unknown; }
}

interface MapContextType {
  map: L.Map | null;
  isMapInitialized: boolean;
  containerRef: MutableRefObject<HTMLDivElement | null>;
  initMap: (options: L.MapOptions) => L.Map;
  setMap: (m: L.Map) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMapState] = useState<L.Map | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

 
  if (window.chrome) {
    const original = L.GridLayer.prototype._initTile;
    L.GridLayer.include({
      _initTile(tile: HTMLElement) {
        original.call(this, tile);
        const size = this.getTileSize();
        tile.style.width = `${size.x -1}px`;
        tile.style.height = `${size.y - 1}px`;
      }
    });
  }

  const initMap = (options: L.MapOptions): L.Map => {
    if (!containerRef.current) throw new Error('Map container unavailable');
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      setIsMapInitialized(false);
    }
    const newMap = L.map(containerRef.current, options);
    mapRef.current = newMap;
    setMapState(newMap);
    setIsMapInitialized(true);
    return newMap;
  };

  const setMap = (m: L.Map) => {
    mapRef.current = m;
    setMapState(m);
    setIsMapInitialized(true);
  };

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setIsMapInitialized(false);
    };
  }, []);

  return (
    <MapContext.Provider value={{ map, isMapInitialized, containerRef, initMap, setMap }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error('useMapContext must be used within MapProvider');
  return ctx;
}

export function useMap() {
  const { map } = useMapContext();
  if (!map) throw new Error('Map not initialized');
  return map;
}

export function useMapInit() { return useMapContext().initMap; }
export function useMapContainer() { return useMapContext().containerRef; }
export function useIsMapInitialized() { return useMapContext().isMapInitialized; }
