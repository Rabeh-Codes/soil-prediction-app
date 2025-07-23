// src/routes/AppRoutes.tsx

import { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ROUTES } from '@/routes/RoutePaths';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

// -------- Lazy Loaded Pages --------
const HomePage = lazy(() => import('@/pages/HomePage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

// Data Viewer
const SinglePointPage = lazy(() => import('@/pages/data-viewer/SinglePointPage'));
const RegionalPage = lazy(() => import('@/pages/data-viewer/RegionalPage'));
const GlobalPage = lazy(() => import('@/pages/data-viewer/GlobalPage'));
const DataViewerOverview = lazy (() => import('@/pages/data-viewer/DataViewerOverview'))
// Tools
const GraphingPage = lazy(() => import('@/pages/tools/GraphingPage'));
const ReportsPage = lazy(() => import('@/pages/tools/ReportsPage'));
const RasiPage = lazy(() => import('@/pages/tools/RasiPage'));
const VisualizePage = lazy(() => import('@/pages/tools/VisualizePage'));
const ClimatologyPage = lazy(() => import('@/pages/tools/ClimatologyPage'));
const ParameterUncertaintyAnalysisPage = lazy(() => import('@/pages/tools/ParameterUncertainlyAnalysisPage'));
const ToolsLayout = lazy(() => import('@/layouts/ToolsLayout'));
const ToolsOverview = lazy(() => import('@/pages/tools/ToolsOverview'))
// Data Services
const ApiPage = lazy(() => import('@/pages/data-services/ApiPage'));
const DatastorePage = lazy(() => import('@/pages/data-services/DatastorePage'));
const GeospatialPage = lazy(() => import('@/pages/data-services/GeospatialPage'));

// Learn
const DocumentationPage = lazy(() => import('@/pages/learn/DocumentationPage'));
const TutorialsPage = lazy(() => import('@/pages/learn/TutorialPage'));
const FaqPage = lazy(() => import('@/pages/learn/FaqPage'));
const CaseStudiesPage = lazy(() => import('@/pages/learn/CaseStudiesPage'));

// Static Info
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const CommunityPage = lazy(() => import('@/pages/CommunityPage'));

// Errors
const UnauthorizedPage = lazy(() => import('@/pages/errors/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));
const MaintenancePage = lazy (() => import('@/pages/errors/MaintenancePage'));
const BadRequestPage = lazy (() => import('@/pages/errors/BadRequestPage'));
const ServerErrorPage = lazy (() => import('@/pages/errors/ServerErrorPage'));
const AppRoutes = () => {
 return (
  <Suspense fallback={<LoadingSpinner fullScreen />}>
    <Routes>
      <Route path={ROUTES.ROOT} element={<MainLayout><Outlet /></MainLayout>}>

        {/* ---------- Base Pages ---------- */}
        <Route index element={<HomePage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.COMMUNITY} element={<CommunityPage />} />

        {/* ---------- Data Viewer Section ---------- */}
        <Route path={ROUTES.DATA_VIEWER.ROOT} element={<Outlet />}>
          <Route index element={<DataViewerOverview />} />
          <Route path={ROUTES.DATA_VIEWER.SINGLE_POINT} element={<SinglePointPage />} />
          <Route path={ROUTES.DATA_VIEWER.REGIONAL} element={<RegionalPage />} />
          <Route path={ROUTES.DATA_VIEWER.GLOBAL} element={<GlobalPage />} />
        </Route>

        {/* ---------- Tools Section ---------- */}
        <Route path={ROUTES.TOOLS.ROOT} element={<ToolsLayout><Outlet /></ToolsLayout>}>
          <Route index element={<ToolsOverview />} />
          <Route path={ROUTES.TOOLS.GRAPHING} element={<GraphingPage />} />
          <Route path={ROUTES.TOOLS.REPORTS} element={<ReportsPage />} />
          <Route path={ROUTES.TOOLS.RASI} element={<RasiPage />} />
          <Route path={ROUTES.TOOLS.VISUALIZE} element={<VisualizePage />} />
          <Route path={ROUTES.TOOLS.CLIMATOLOGY} element={<ClimatologyPage />} />
          <Route path={ROUTES.TOOLS.PARAMETER_UNCERTAINTY_ANALYSIS} element={<ParameterUncertaintyAnalysisPage />} />
        </Route>

        {/* ---------- Data Services Section ---------- */}
        <Route path={ROUTES.DATA_SERVICES.API} element={<ApiPage />} />
        <Route path={ROUTES.DATA_SERVICES.DATASTORE} element={<DatastorePage />} />
        <Route path={ROUTES.DATA_SERVICES.GEOSPATIAL} element={<GeospatialPage />} />

        {/* ---------- Learn Section ---------- */}
        <Route path={ROUTES.LEARN.DOCUMENTATION} element={<DocumentationPage />} />
        <Route path={ROUTES.LEARN.TUTORIALS} element={<TutorialsPage />} />
        <Route path={ROUTES.LEARN.FAQ} element={<FaqPage />} />
        <Route path={ROUTES.LEARN.CASE_STUDIES} element={<CaseStudiesPage />} />

        {/* ---------- Error Pages ---------- */}
        <Route path={ROUTES.ERRORS.UNAUTHORIZED} element={<UnauthorizedPage />} />
        <Route path={ROUTES.ERRORS.MAINTENANCE} element={<MaintenancePage />} />
        <Route path={ROUTES.ERRORS.BAD_REQUEST} element={<BadRequestPage />} />
        <Route path={ROUTES.ERRORS.SERVER_ERROR} element={<ServerErrorPage />} />
        <Route path={ROUTES.ERRORS.NOT_FOUND} element={<NotFoundPage />} />

        {/* ---------- Catch All ---------- */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
}
export default AppRoutes;
