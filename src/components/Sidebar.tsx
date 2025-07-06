import { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  FaRocket,
  FaUserAstronaut,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface SideBarProps {
  'aria-label'?: string;
  selectedOption: string | null;
  setSelectedOption: Dispatch<SetStateAction<string | null>>;
}

const SPACE_DARK = '#0d0d1a';

export default function Sidebar({ setSelectedOption, ...rest }: SideBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const menuItems = [
    {
      label: 'Single Point',
      icon: <FaMapMarkerAlt />,
      path: '/single-point',
      description: 'Access data for specific locations',
    },
    {
      label: 'Regional',
      icon: <FaGlobeAfrica />,
      path: '/regional',
      description: 'Analyze regional climate patterns',
    },
    {
      label: 'Global',
      icon: <FaGlobe />,
      path: '/global',
      description: 'Global climate data visualization',
    },
    {
      label: 'Visualize',
      icon: <FaChartBar />,
      path: '/visualize',
      description: 'Interactive data visualizations',
    },
    {
      label: 'Graphing',
      icon: <FaChartBar />,
      path: '/graphing',
      description: 'Create custom graphs and charts',
    },
    {
      label: 'Reports',
      icon: <FaEllipsisH />,
      path: '/reports',
      description: 'Generate automated reports',
    },
    {
      label: 'RASI',
      icon: <FaSatellite />,
      path: '/rasi',
      description: 'Remote sensing data interface',
    },
    {
      label: 'Parameters',
      icon: <FaSlidersH />,
      path: '/parameters',
      description: 'Adjust data parameters',
    },
    {
      label: 'Documentation',
      icon: <FaBook />,
      path: '/documentation',
      description: 'Technical documentation',
    },
    {
      label: 'Tutorial',
      icon: <FaGraduationCap />,
      path: '/tutorial',
      description: 'Learning resources',
    },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      className={`h-screen overflow-y-auto rounded-r-lg border-r border-gray-800 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[70px]' : 'w-[280px]'
      } relative z-10`}
      aria-label={rest['aria-label'] || 'Sidebar navigation'}
      style={{ background: SPACE_DARK }}
    >
      {/* Logo + Title */}
      <div
        className={`border-b border-gray-800 p-4 ${isCollapsed ? 'text-center' : 'flex items-center gap-3'}`}
      >
        <div className="inline-flex rounded-full bg-white p-1">
          <FaRocket className="text-xl text-blue-800" />
        </div>
        {!isCollapsed && (
          <div>
            <h3 className="text-lg font-bold text-white">NASA POWER</h3>
            <p className="text-xs text-gray-400">Data Access Viewer</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <ul className="space-y-1 p-3">
        {menuItems.map(item => (
          <li key={item.label}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3 overflow-hidden rounded-md px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-blue-800 text-white shadow' : 'text-slate-300 hover:bg-gray-800'
                }`
              }
              onClick={() => setSelectedOption(item.label)}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span
                className={`text-base ${location.pathname === item.path ? 'text-white' : 'text-cyan-400'}`}
              >
                {item.icon}
              </span>
              {!isCollapsed && <span>{item.label}</span>}

              {/* Tooltip on collapsed mode */}
              <AnimatePresence>
                {isCollapsed && hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-full z-20 ml-3 min-w-[200px] rounded-md bg-gray-900 px-3 py-2 text-xs text-white shadow-lg"
                  >
                    <div className="font-bold">{item.label}</div>
                    <div className="mt-1 text-gray-300">{item.description}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User info */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-900 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500">
              <FaUserAstronaut className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-white">Dr. Katherine Johnson</div>
              <div className="text-xs text-gray-400">NASA Scientist</div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={toggleCollapse}
        className="absolute right-3 top-4 rounded-full p-2 transition-colors hover:bg-gray-800"
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
      </button>

      {/* Stars / space dots */}
      {!isCollapsed && (
        <>
          <div className="absolute right-4 top-1/4 h-2 w-2 animate-pulse rounded-full bg-white" />
          <div className="absolute left-6 top-1/3 h-1 w-1 animate-pulse rounded-full bg-cyan-400" />
          <div className="absolute bottom-1/3 right-8 h-1 w-1 animate-pulse rounded-full bg-yellow-400" />
        </>
      )}
    </motion.aside>
  );
}
