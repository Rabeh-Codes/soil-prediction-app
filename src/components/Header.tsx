// src/components/Header.tsx

import { memo, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '@/styles/Header.module.scss';
import AccessDropdown from '@/components/AccessDropdown';


interface HeaderProps {
  onMenuClick?: () => void;
  accessOpen: boolean; 
  setAccessOpen:
  React.Dispatch<React.SetStateAction<boolean>>;
  showMenuButton?: boolean;
}

const Header = ({ onMenuClick, accessOpen, setAccessOpen, showMenuButton = false }: HeaderProps) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen]= useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Access', path: '/data-viewer' },
    { label: 'Engage', path: '/engage' },
    { label: 'Learn', path: '/learn' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact', highlight: true },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setAccessOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // search logic here
  };

  return (
    <header className={styles['header']} ref={headerRef}>
      <div className={styles['inner']}>

        {/* ===== Logo Section ===== */}
        <Link to="/" className={styles['logo']}>
          <img src="/nasa-logo.jpg" alt="NASA Logo" className={styles['logoImage']} />
          <div>
            <h1 className={styles['logoTitle']}>NASA POWER</h1>
            <p className={styles['logoSubtitle']}>Data Access Viewer (DAV)</p>
          </div>
        </Link>

        {/* ===== Navigation Section ===== */}
             {/* Navigation */}
      <nav className={styles['nav']}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const isAccess = item.label === 'Access';

          return (
            <div key={item.label} className={styles['navItemWrapper']}>
              <Link
                to={item.path}
                onClick={(e) => {
                  if (isAccess) {
                    e.preventDefault();
                    setAccessOpen(prev => !prev);
                  }
                }}
                className={`
                  ${styles['navItem']} 
                  ${isActive ? styles['active'] : ''} 
                  ${item.highlight ? styles['highlight'] : ''}
                `}
              >
                {item.label}
                {isAccess && <span className={styles['arrow']}>⌄</span>}
              </Link>

              {isAccess && accessOpen && (
                <div className={styles['accessDropdownWrapper']}>
                  <AccessDropdown />
                </div>
              )}
            </div>
          );
        })}
      </nav>


        {/* ===== Right Actions Section ===== */}
        <div className={styles['actions']}>
          <form 
              className={styles['searchForm']} onSubmit={handleSearch}
              
              onMouseEnter={() => setSearchOpen(true)}
              onMouseLeave={() => setSearchOpen}>
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles['searchInput']}
              ref={searchRef}
            />
            <button type="submit" className={styles['searchButton']}>🔍</button>
            {searchOpen && (
              <div className={styles['searchDropdown']}>
                 <p>Search content..</p>
              </div>
            )}
          </form>

          {showMenuButton && (
            <button
              className={styles['menuButton']}
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          )}
        </div>
      </div>

      {/* ===== Dropdown: Access Panel ===== */}
     
    </header>
  );
};

export default memo(Header);
