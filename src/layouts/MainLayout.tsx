import { memo, useState } from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import SideBar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import MapView from '@/components/MapView';
import { useLoading } from '@/hooks/useLoading';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorFallback from '@/components/ErrorFallback';
import '@/styles/MainLayout.css';

interface MainLayoutProps {
  children: ReactNode;
  layoutType?: 'default' | 'minimal';
}

const MainLayout = ({ children, layoutType = 'default' }: MainLayoutProps) => {
  const { isLoading } = useLoading();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading...</title>
        </Helmet>
        <LoadingSpinner fullScreen aria-label="Loading application" />
      </>
    );
  }

  return (
    <div className={`app-container ${layoutType}`} role="main">
      <Helmet>
        <html lang="en" dir="ltr" />
        <body className="main-layout" />
      </Helmet>

      {layoutType === 'default' && (
        <>
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <SideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </>
      )}

      <div className="main-content">
        <div className="map-area">
          <MapView selectedOption={selectedOption} />
        </div>

        <div className="content-area">
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
            {children}
          </ErrorBoundary>
        </div>
      </div>

      <Footer minimal={layoutType !== 'default'} />
    </div>
  );
};

export default memo(MainLayout);
