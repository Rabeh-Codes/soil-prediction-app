// src/theme/index.ts
import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material';
import { responsiveFontSizes } from '@mui/material';

// Base color palette (shared between themes)
const baseColors = {
  primary: {
    main: '#4361ee', // Primary brand color
    dark: '#3a56d4', // Darker shade for hover states
    light: '#4f6df5', // Lighter shade for accents
  },
  secondary: {
    main: '#3f37c9', // Secondary brand color
  },
  error: {
    main: '#f72585', // Error/alert color
  },
  warning: {
    main: '#ff9e00', // Warning color
  },
  info: {
    main: '#4cc9f0', // Informational color
  },
  success: {
    main: '#2ec4b6', // Success color
  },
};

/**
 * Light Theme Configuration
 * - Uses light background colors
 * - Darker text for better contrast
 * - Responsive font sizes
 */
export const lightTheme: Theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
      ...baseColors,
      background: {
        default: '#f8f9fa', // Page background
        paper: '#ffffff', // Card/surface background
      },
      text: {
        primary: '#212529', // Main text color
        secondary: '#495057', // Secondary text color
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // Disable auto-uppercase
            borderRadius: '8px', // Custom border radius
          },
        },
      },
    },
  })
);

/**
 * Dark Theme Configuration
 * - Uses dark background colors
 * - Lighter text for better contrast
 * - Modified colors for dark mode
 */
export const darkTheme: Theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      ...baseColors,
      background: {
        default: '#121212', // Dark page background
        paper: '#1e1e1e', // Dark card/surface
      },
      text: {
        primary: '#e9ecef', // Light text
        secondary: '#ced4da', // Secondary light text
      },
    },
    // Inherit only typography and component overrides from lightTheme
    typography: lightTheme.typography,
    components: lightTheme.components,
  })
);
