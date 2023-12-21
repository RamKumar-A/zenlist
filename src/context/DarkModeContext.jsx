import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode
      ? JSON.parse(storedDarkMode)
      : window.matchMedia('prefers-color-scheme:dark').matches || false;
  });

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => {
      localStorage.setItem('darkMode', JSON.stringify(!isDark));
      return !isDark;
    });
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error('used outside the provider');
  return context;
}

export { useDarkMode, DarkModeProvider };
