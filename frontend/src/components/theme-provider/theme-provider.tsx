import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider(props: Readonly<ThemeProviderProps>) {
  const {
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
  } = props;

  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setTheme(systemTheme);

      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const handleTheme = useCallback(
    (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    [theme, setTheme]
  );

  const value = useMemo(
    () => ({ theme, setTheme: handleTheme }),
    [theme, setTheme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
