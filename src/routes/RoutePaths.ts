
/**
 * Full routing schema for NASA POWER inspired app
 * Organized by functional domain
 *
 * @version 1.0
 */

export const ROUTES = {
  // ----- Base -----
  ROOT: '/',
  HOME: '/home',
  DASHBOARD: '/dashboard',

  // ----- Data Viewer -----
  DATA_VIEWER: {
    ROOT: '/data-viewer',
    SINGLE_POINT: '/data-viewer/single-point',
    REGIONAL: '/data-viewer/regional',
    GLOBAL: '/data-viewer/global',
  },

  // ----- Tools -----
  TOOLS: {
    ROOT: '/tools',
    GRAPHING: '/tools/graphing',
    REPORTS: '/tools/reports',
    RASI: '/tools/rasi',
    VISUALIZE: '/tools/visualize',
    CLIMATOLOGY: '/tools/climatology',
    PARAMETER_UNCERTAINTY_ANALYSIS: '/tools/parameter-uncertainty-analysis',
  },

  // ----- Data Services -----
  DATA_SERVICES: {
    ROOT: '/data-services',
    API: '/data-services/api',
    DATASTORE: '/data-services/datastore',
    GEOSPATIAL: '/data-services/geospatial',
  },

  // ----- Learn & Support -----
  LEARN: {
    ROOT: '/learn',
    DOCUMENTATION: '/learn/documentation',
    TUTORIALS: '/learn/tutorials',
    FAQ: '/learn/faq',
    CASE_STUDIES: '/learn/case-studies',
  },

  // ----- Informational Pages -----
  ABOUT: '/about',
  CONTACT: '/contact',
  COMMUNITY: '/community',

  // ----- Error Pages -----
  ERRORS: {
    UNAUTHORIZED: '/errors/unauthorized',
    NOT_FOUND: '/errors/not-found',
    MAINTENANCE: '/errors/maintenance',
    BAD_REQUEST: '/errors/bad-request',
    SERVER_ERROR: '/errors/server-error',
  },

  // ----- Wildcard -----
  DEFAULT: '*',
};

// ----- Helpers for clean route usage -----
export const getRoute = {
  dataViewer: (subPath?: string) =>
    subPath ? `${ROUTES.DATA_VIEWER.ROOT}${subPath}` : ROUTES.DATA_VIEWER.ROOT,

  tool: (toolName: keyof typeof ROUTES.TOOLS) =>
    ROUTES.TOOLS[toolName],

  dataService: (service: keyof typeof ROUTES.DATA_SERVICES) =>
    ROUTES.DATA_SERVICES[service],

  learn: (resource: keyof typeof ROUTES.LEARN) =>
    ROUTES.LEARN[resource],

  error: (errorType: keyof typeof ROUTES.ERRORS) =>
    ROUTES.ERRORS[errorType],
};

// ----- Types -----
export type AppRoutes = typeof ROUTES;
export type ToolRoutes = keyof typeof ROUTES.TOOLS;
export type DataServiceRoutes = keyof typeof ROUTES.DATA_SERVICES;
