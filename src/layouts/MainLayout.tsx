// src/layouts/MainLayout.tsx
import { memo, useState } from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLoading } from '@/hooks/useLoading';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorFallback from '@/components/ErrorFallback';
import MapView from '@/components/map/MapView';
import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
  layoutType?: 'default' | 'minimal';
}

const MainLayout = ({ children, layoutType = 'default' }: MainLayoutProps) => {
  const { isLoading } = useLoading();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ accessOpen, setAccessOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>('single-point')
  if (isLoading) {
    return (
      <div>
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <LoadingSpinner fullScreen aria-label="Loading application" />
      </div>
    );
  }

  return (
    <div className={`app-container ${layoutType}} h-screen flex flex-col`} role="main">
      <Helmet>
        <html lang="en" dir="ltr" />
        <body className="main-layout" />
      </Helmet>

      {layoutType === 'default' && (
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
           accessOpen={accessOpen} 
           setAccessOpen={setAccessOpen}/>
      )}

      <div className="flex h-full w-full overflow-hidden">
  {/* Sidebar container */}
  <div
    className={`transition-all duration-300 
                $ {sidebarOpen ? 'open' 'closed' w-64' : 'w-64'} 
                overflow-hidden`}
  >
   <Sidebar selectedOption={selectedOption} setSelectedOption={setSelectedOption} sidebarOpen={sidebarOpen}/>
  </div>

  {/* Map container */}
  <div className="flex-1 relative z-0">
    <MapView
      selectedOption={selectedOption}
      sidebarOpen={sidebarOpen}
      setSelectedOption={setSelectedOption}
    />
    {selectedOption === 'single-point' &&
    <div className='flex z-10 bg-white p-4 rounded-lg shadow-lg z-10transition-all duration-300'
       >
    <Outlet />
    </div>
}
  </div>

        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
          {children}
        </ErrorBoundary>
        
      </div>

      <Footer minimal={layoutType !== 'default'} />
    </div>
  );
};

export default memo(MainLayout);
