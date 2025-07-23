import { Suspense, useMemo } from 'react';
import { MapProvider } from '@/components/map/MapContext';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './providers/ThemeProvider';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';
import AppRoutes from './routes/AppRoutes';

function App() {
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  }), []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary 
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()}
        >
          <ThemeProvider>
            <MapProvider>
              <Suspense fallback={<LoadingSpinner fullScreen />}>
                <AppRoutes />
              </Suspense>

              {import.meta.env.DEV && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </MapProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
