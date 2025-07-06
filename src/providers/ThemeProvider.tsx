// src/providers/ThemeProvider.tsx
import { useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '@/types/theme';
import { ThemeContext } from './ThemeContext';
import type { ThemeMode } from './ThemeContext';
interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider = ({ children, defaultMode = 'light' }: ThemeProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    return savedMode || (prefersDarkMode ? 'dark' : defaultMode);
  });

  const isDarkMode = mode === 'dark';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  const contextValue = useMemo(() => ({ mode, toggleTheme, isDarkMode }), [mode, isDarkMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
