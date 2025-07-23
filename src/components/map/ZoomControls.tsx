import { FaPlus, FaMinus } from 'react-icons/fa';
import { useMap } from '@/components/map/MapContext';

export default function ZoomControls() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const currentZoom = map.getZoom();
  const minZoom = map.getMinZoom();
  const maxZoom = map.getMaxZoom();

  return (
    <div className="absolute top-4 left-4 z-[1000] flex flex-col items-center bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 overflow-hidden">
      <button
        onClick={handleZoomIn}
        disabled={currentZoom >= maxZoom}
        aria-label="Zoom in"
        className={`p-2.5 transition-all w-full flex justify-center ${
          currentZoom >= maxZoom
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-white hover:bg-blue-600/50 active:bg-blue-700/50'
        }`}
      >
        <FaPlus className="w-2 h-2" />
      </button>

      <div className="w-full h-px bg-gray-700"></div>

      <div className="py-1 px-2 text-xs text-gray-300 font-mono">
        {currentZoom}
      </div>

      <div className="w-full h-px bg-gray-700"></div>

      <button
        onClick={handleZoomOut}
        disabled={currentZoom <= minZoom}
        aria-label="Zoom out"
        className={`p-2.5 transition-all w-full flex justify-center ${
          currentZoom <= minZoom
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-white hover:bg-blue-600/50 active:bg-blue-700/50'
        }`}
      >
        <FaMinus className="w-3 h-3" />
      </button>
    </div>
  );
}
