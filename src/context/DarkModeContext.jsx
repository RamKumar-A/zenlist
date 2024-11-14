import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createAppTheme } from '../helpers/theme';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('themeMode') || 'system';
    return storedMode;
  });

  useEffect(() => {
    const prefersDarkmode = window.matchMedia(
      '(prefers-color-scheme:dark)'
    ).matches;
    if (mode === 'system') {
      setMode(prefersDarkmode ? 'dark' : 'light');
    }
  }, [mode]);

  function setTheme(newMode) {
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  }

  const theme = useMemo(() => {
    const themeMode = createAppTheme(mode);
    return createTheme({
      ...themeMode,
      breakpoints: {
        values: {
          mobile: 300,
          tablet: 720,
          laptop: 1024,
          desktop: 1200,
        },
      },
    });
  }, [mode]);

  return (
    <DarkModeContext.Provider value={{ mode, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error('used outside the provider');
  return context;
}

export { useDarkMode, DarkModeProvider };

// useEffect(
//   function () {
//     function applyTheme(currentMode) {
//       const prefersDark = window.matchMedia(
//         'prefers-color-scheme:dark'
//       ).matches;
//       if (
//         currentMode === 'dark' ||
//         (currentMode === 'system' && prefersDark)
//       ) {
//         document.documentElement.classList.add('dark');
//         document.documentElement.classList.remove('light');
//       } else {
//         document.documentElement.classList.remove('dark');
//         document.documentElement.classList.add('light');
//       }
//     }
//     applyTheme(mode);

//     // Watch for system preference if in 'system' mode
//     const mediaQuery = window.matchMedia('prefers-color-scheme:dark');
//     const handleChange = () => applyTheme(mode);

//     if (mode === 'system')
//       mediaQuery.addEventListener('change', handleChange);

//     return () => mediaQuery.removeEventListener('change', handleChange);
//   },
//   [mode]
// );
