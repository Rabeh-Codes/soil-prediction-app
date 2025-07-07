import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

/**
 * ErrorFallback component - Displays a user-friendly error UI when an error boundary catches an error
 *
 * Features:
 * - Responsive design with dark mode support
 * - Detailed error information in development mode
 * - Automatic error logging in development
 * - Focus management for accessibility
 * - Multiple recovery options
 *
 * @param {FallbackProps} props - Contains error and resetErrorBoundary function
 * @returns {JSX.Element} - The error fallback UI
 */
const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const isProduction = import.meta.env.PROD;
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Log error in development environment
  useEffect(() => {
    if (!isProduction) {
      console.error('ErrorBoundary caught:', error);
    }
  }, [error, isProduction]);

  // Set focus to heading for accessibility
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  /**
   * Attempts to recover by resetting the error boundary
   */
  const handleReset = () => {
    resetErrorBoundary();
  };

  /**
   * Navigates to home page and resets the error boundary
   */
  const handleGoHome = () => {
    navigate('/');
    resetErrorBoundary();
  };

  /**
   * Reloads the entire application
   */
  const handleReloadApp = () => {
    window.location.reload();
  };

  return (
    <div
      data-testid="error-fallback"
      className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 font-sans text-gray-900 dark:bg-gray-900 dark:text-gray-100"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="mx-auto w-full max-w-2xl space-y-6 text-center">
        <div className="animate-pulse text-6xl text-yellow-500" aria-hidden="true">
          ⚠️
        </div>

        <h1 className="text-2xl font-bold text-red-600" ref={headingRef} tabIndex={-1}>
          Something Went Wrong
        </h1>

        <p className="text-lg">
          We're sorry, but an unexpected error occurred. Please try again or contact support.
        </p>

        {/* Detailed error information (development only) */}
        {!isProduction && (
          <div className="space-y-3 overflow-x-auto rounded-lg bg-red-50 p-4 text-left text-sm dark:bg-red-900/20">
            <div>
              <strong className="mb-1 block font-medium text-red-700 dark:text-red-300">
                Error Message:
              </strong>
              <pre className="whitespace-pre-wrap rounded bg-white p-2 dark:bg-gray-800">
                {error.message}
              </pre>
            </div>

            {error.stack && (
              <div>
                <strong className="mb-1 block font-medium text-red-700 dark:text-red-300">
                  Stack Trace:
                </strong>
                <pre className="max-h-60 overflow-y-auto whitespace-pre-wrap rounded bg-white p-2 text-xs dark:bg-gray-800">
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleReset}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-base font-medium text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Try to recover from this error"
          >
            Try Again
          </button>

          <button
            onClick={handleGoHome}
            className="rounded-lg border border-blue-600 px-5 py-2.5 text-base font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-blue-900/10"
            aria-label="Go to the home page"
          >
            Go to Home
          </button>

          <button
            onClick={handleReloadApp}
            className="rounded-lg bg-gray-200 px-5 py-2.5 text-base font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            aria-label="Reload the entire application"
          >
            Reload App
          </button>
        </div>

        {/* Support information */}
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Need immediate assistance? Contact our{' '}
            <a
              href="/support"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              aria-label="Contact support team"
            >
              support team
            </a>
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Error ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
