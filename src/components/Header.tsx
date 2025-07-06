import { memo, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { FC } from 'react';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
}

const Header: FC<HeaderProps> = ({ onMenuClick, showMenuButton = false }) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const navItems = [
    { label: 'Access', path: '/data-viewer', icon: '📊' },
    { label: 'Engage', path: '/engage', icon: '🤝' },
    { label: 'Learn', path: '/learn', icon: '📚' },
    { label: 'About', path: '/about', icon: 'ℹ️' },
    { label: 'Contact', path: '/contact', icon: '✉️', isHighlighted: true },
  ];

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchQuery);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-gray-200 bg-white/95 shadow-md backdrop-blur">
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        {/* Left: Logo & Title */}
        <Link to="/" className="group flex items-center gap-3" aria-label="NASA POWER Home">
          <img
            src="/nasa-logo.svg"
            alt="NASA Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h1 className="whitespace-nowrap text-lg font-bold text-gray-900">NASA POWER</h1>
            <p className="text-xs font-medium text-gray-600">Data Access Viewer (DAV)</p>
          </div>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden gap-2 md:flex" aria-label="Main navigation">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.isHighlighted
                    ? 'border border-red-600 text-red-600 hover:bg-red-50'
                    : isActive
                      ? 'bg-gray-50 font-semibold text-blue-800'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden items-center md:flex">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search datasets..."
                className="w-52 rounded-lg border border-gray-300 py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                aria-label="Submit search"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Mobile Search Toggle */}
          <button
            className="rounded-full p-2 transition-colors hover:bg-gray-100 md:hidden"
            onClick={toggleSearch}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
          >
            <SearchIcon />
          </button>

          {/* Mobile Menu Button */}
          {showMenuButton && (
            <button
              className="rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              <MenuIcon />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Panel */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-white px-6 py-4 shadow-lg md:hidden">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              ref={searchRef}
              type="text"
              placeholder="Search datasets..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

// Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M11 19A8 8 0 1 0 11 3a8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MenuIcon = () => (
  <div className="space-y-1.5">
    <span className="block h-0.5 w-6 bg-gray-800" />
    <span className="block h-0.5 w-6 bg-gray-800" />
    <span className="block h-0.5 w-6 bg-gray-800" />
  </div>
);

export default memo(Header);
