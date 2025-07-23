
import { useEffect, useRef } from 'react';
import { useMap } from '@/components/map/MapContext';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';

const DrawingTools = () => {
  const map = useMap();
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const drawControlRef = useRef<L.Control.Draw | null>(null);

  useEffect(() => {
    if (!map) return;

    
    drawnItemsRef.current = new L.FeatureGroup();
    map.addLayer(drawnItemsRef.current);

   
    drawControlRef.current = new L.Control.Draw({
      position: 'topright',
      draw: {
        polyline: {},
        polygon: {},
        rectangle: {},
        marker: {},
        circlemarker: {},
        circle: false 
      },
      edit: {
        featureGroup: drawnItemsRef.current
      }
    });

    map.addControl(drawControlRef.current);

    
    const handleDrawCreated = (e: any) => {
      const layer = e.layer as L.Layer;
      if (drawnItemsRef.current) {
        drawnItemsRef.current.addLayer(layer);
      }
    };

    map.on(L.Draw.Event.CREATED, handleDrawCreated);

  
    return () => {
      if (drawControlRef.current) {
        map.removeControl(drawControlRef.current);
      }
      
      if (drawnItemsRef.current) {
        map.removeLayer(drawnItemsRef.current);
      }
      
      map.off(L.Draw.Event.CREATED, handleDrawCreated);
    };
  }, [map]);

  return null;
};

export default DrawingTools;