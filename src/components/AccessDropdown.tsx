import { Link } from 'react-router-dom';
import type { AccessItem } from '../types';
import styles from '@/styles/AccessDropDown.module.scss';
import {useState} from 'react';
const ACCESS_ITEMS: AccessItem[] = [
  {
    title: 'Data Access Viewer',
    path: '/data-viewer',
    description: 'Interactive data visualization tool',
    image: '/images/data-viewer.jpg'
  },
  {
    title: 'Parameter Uncertainty Viewer',
    path: '/parameter-uncertainty',
    description: 'Analyze measurement uncertainties',
    image: 'images/uncertainly.jpg'
  },
  {
    title: 'Application Programming Interface',
    path: '/api',
    description: 'Developer access to our APIs',
    image: '/images/api.jpg'
  },
  {
    title: 'Direct Datastore Access',
    path: '/datastore',
    description: 'Raw data download options',
    image: '/images/datastore.jpg'
  },
  {
    title: 'Geospatial Data Services',
    path: '/geospatial',
    description: 'GIS and mapping services',
    image: '/images/geospatial.jpg'
  },
];

const AccessDropdown = () => {
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  return (
    <section className={styles['access-dropdown']} aria-label="Data access options">
      {/* Left Section */}
      <article className={styles['access-left']}>
        <h2 className={styles['access-title']}>Access Data</h2>
        <p className={styles['access-description']}>
          Access POWER's free, low-latency, high-accuracy, community-specific datasets offered in
          customizable units and formats.
        </p>
      </article>

      {/* Center Section with links */}
      <nav className={styles['access-center']} aria-label="Data access navigation">
        <ul className={styles['access-list']}>
          {ACCESS_ITEMS.map(item => (
            <li key={item.path} className={styles['access-item']}
            onMouseEnter={() => 
              setHoveredPath(item.path)
            }
            onMouseLeave={()=> setHoveredPath(null)}>
              <Link
                to={item.path}
                className={styles['access-link']}
                aria-label={`${item.title} - ${item.description}`}
              >
                {item.title}
                <span className={styles['arrow']} aria-hidden="true">
                  ⮞
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Section (Image) */}
      <figure className={styles['access-right']}>
  {hoveredPath ? (
    <img
      src={ACCESS_ITEMS.find(item => item.path === hoveredPath)?.image || ''}
      alt="Hovered illustration"
      className={styles['access-image']}
    />
  ) : (
    <p className={styles['access-caption']}>Hover over an item to preview</p>
  )}
</figure>
    </section>
  );
};

export default AccessDropdown;
