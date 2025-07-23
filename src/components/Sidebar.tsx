// src/components/Sidebar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
import {
  FaMapMarkerAlt,
  FaGlobeAfrica,
  FaGlobe,
  FaChartBar,
  FaEllipsisH,
  FaSatellite,
  FaSlidersH,
  FaBook,
  FaGraduationCap,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

interface SideBarProps {
  'aria-label'?: string;
  sidebarOpen: boolean;
  selectedOption: string | null;
  setSelectedOption: Dispatch<SetStateAction<string | null>>;
}

export default function Sidebar({ selectedOption, setSelectedOption, ...rest }: SideBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const menuItems = [
    { label: 'single-point', icon: <FaMapMarkerAlt />, path: '/data-viewer/single-point' },
    { label: 'regional', icon: <FaGlobeAfrica />, path: '/regional' },
    { label: 'global', icon: <FaGlobe />, path: '/global' },
    { label: 'visualize', icon: <FaChartBar />, path: '/visualize' },
    { label: 'graphing', icon: <FaChartBar />, path: '/graphing' },
    { label: 'reports', icon: <FaEllipsisH />, path: '/reports' },
    { label: 'rasi', icon: <FaSatellite />, path: '/rasi' },
    { label: 'parameters', icon: <FaSlidersH />, path: '/parameters' },
    { label: 'documentation', icon: <FaBook />, path: '/documentation' },
    { label: 'tutorial', icon: <FaGraduationCap />, path: '/tutorial' },
  ];

  return (
    <aside
      className={`bg-[#1e1e2f] text-slate-300 h-full overflow-y-auto p-4 border border-gray-700 z-20 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
      aria-label={rest['aria-label'] || 'Sidebar navigation'}
    >
      <div className="flex items-center justify-between mb-4">
        {!isCollapsed && <h3 className="text-lg font-bold text-center w-full">Select Mode</h3>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-300 hover:text-white"
        >
          {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>
      </div>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center w-full px-3 py-2 rounded-md transition duration-200 text-sm font-medium gap-3 hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-purple-400/10 hover:shadow-inner hover:scale-[1.02] ${
                  isActive || selectedOption === item.label ? 'bg-green-600 text-white' : ''
                }`
              }
              onClick={() => setSelectedOption(item.label)}
            >
              <span className="text-base">{item.icon}</span>
              {!isCollapsed && (
                <span className="text-sm capitalize">{item.label.replace(/-/g, ' ')}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full px-2 py-1 text-sm text-gray-300 hover:text-white"
        >
          <span className="text-lg">
            {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
          </span>
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
