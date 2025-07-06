import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Create the ThemeContext
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use ThemeContext
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
