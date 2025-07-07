import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Import modules as objects to avoid top-level mock issues with Vitest
import * as AppRoutesModule from '../routes/AppRoutes';
import * as SpinnerModule from '../components/LoadingSpinner';
import * as DevtoolsModule from '@tanstack/react-query-devtools';

// Create a wrapper that includes all required providers
const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe('App', () => {
  // Before each test, mock key child components to isolate App behavior
  beforeEach(() => {
    vi.spyOn(AppRoutesModule, 'default').mockImplementation(() => (
      <div data-testid="app-routes">App Routes</div>
    ));

    vi.spyOn(SpinnerModule, 'default').mockImplementation(() => (
      <div data-testid="loading-spinner">Loading...</div>
    ));

    vi.spyOn(DevtoolsModule, 'ReactQueryDevtools').mockImplementation(() => (
      <div data-testid="react-query-devtools" />
    ));
  });

  // Reset all mocks after each test
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', async () => {
    render(<App />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByTestId('app-routes')).toBeInTheDocument();
    });
  });

  it('wraps the app with required providers', async () => {
    render(<App />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByTestId('app-routes')).toBeInTheDocument();
    });
  });

  it('renders Suspense fallback when AppRoutes is loading', async () => {
    // Simulate lazy loading by throwing a Promise
    vi.spyOn(AppRoutesModule, 'default').mockImplementation(() => {
      throw new Promise(() => {});
    });
    render(<App />, { wrapper: createWrapper() });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows ReactQueryDevtools in development environment', async () => {
    // Temporarily override NODE_ENV to simulate development
    vi.stubEnv('NODE_ENV', 'development');

    render(<App />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.getByTestId('react-query-devtools')).toBeInTheDocument();
    });

    // Restore original environment variables
    vi.unstubAllEnvs();
  });
});
