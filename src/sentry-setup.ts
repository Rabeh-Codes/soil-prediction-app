// src/sentry-setup.ts
import * as Sentry from '@sentry/react';


Sentry.init({
   dsn: 'https://a7db5dc1b341e6c5ce32bfe7c333af0a@o4509695683264512.ingest.us.sentry.io/4509695697616896',
  integrations: [Sentry.browserTracingIntegration()] ,
  tracesSampleRate: 1.0,
  release: 'soil-prediction-app@1.0.0',
  environment: import.meta.env.MODE || 'development'
});
