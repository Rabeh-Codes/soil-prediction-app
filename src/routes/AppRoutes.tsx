// This file defines all client-side routes using React Router v6 with lazy loading and layout composition.

import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import MainLayout from '@/layouts/MainLayout';

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const LearnPage = lazy(() => import('@/pages/LearnPage'));
const EngagePage = lazy(() => import('@/pages/EngagePage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const DataViewerPage = lazy(() => import('@/pages/DataViewerPage'));
const ApplicationProgramingPage = lazy(() => import('@/pages/ApplicationProgramingPage'));
const DirectDatastorePage = lazy(() => import('@/pages/DirectDatastorePage'));
const GeospatialDataPage = lazy(() => import('@/pages/GeospatialDataPage'));
const ParameterUncertainlyPage = lazy(() => import('@/pages/ParameterUncertainlyPage'));

const SinglePointPage = lazy(() => import('@/pages/SinglePointPage'));
const RegionalPage = lazy(() => import('@/pages/RegionalPage'));
const GlobalPage = lazy(() => import('@/pages/GlobalPage'));
const VisualizePage = lazy(() => import('@/pages/VisualizePage'));
const GraphingPage = lazy(() => import('@/pages/GraphingPage'));
const ReportsPage = lazy(() => import('@/pages/ReportsPage'));
const RasiPage = lazy(() => import('@/pages/RasiPage'));

const DocumentationPage = lazy(() => import('@/pages/DocumentationPage'));
const TutorialPage = lazy(() => import('@/pages/TutorialPage'));

const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          {/* Main Pages */}
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="engage" element={<EngagePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="data-viewer" element={<DataViewerPage />} />

          {/* Access Pages */}
          <Route path="api" element={<ApplicationProgramingPage />} />
          <Route path="datastore" element={<DirectDatastorePage />} />
          <Route path="geospatial" element={<GeospatialDataPage />} />
          <Route path="parameter-uncertainty" element={<ParameterUncertainlyPage />} />

          {/* Sidebar Pages */}
          <Route path="single-point" element={<SinglePointPage />} />
          <Route path="regional" element={<RegionalPage />} />
          <Route path="global" element={<GlobalPage />} />
          <Route path="visualize" element={<VisualizePage />} />
          <Route path="graphing" element={<GraphingPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="rasi" element={<RasiPage />} />

          {/* Support Pages */}
          <Route path="documentation" element={<DocumentationPage />} />
          <Route path="tutorial" element={<TutorialPage />} />

          {/* System Pages */}
          <Route path="unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
