import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';

const SIMPLE_COLORS_KEY = 'minimalist-colors';

export const useTheme = () => {
  const getInitialTheme = (): boolean => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(SIMPLE_COLORS_KEY);
      return storedTheme ? JSON.parse(storedTheme) : true;
    }
    return true;
  };

  const [theme, saveTheme] = useLocalStorage(SIMPLE_COLORS_KEY, getInitialTheme())

  useEffect(() => {
    document.body.classList.remove(SIMPLE_COLORS_KEY);

    if (theme) document.body.classList.add(SIMPLE_COLORS_KEY);

    saveTheme(theme)
  }, [theme]);

  const toggleTheme = () => {
    saveTheme((prevTheme) => !prevTheme);
  };

  return toggleTheme;
};
