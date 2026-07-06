"use client";

import {
  useCallback,
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  mounted: boolean;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

function applyThemeToDocument(theme: Theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  return resolved;
}

const THEME_CHANGE_EVENT = "nizzo-theme-change";

function readStoredTheme(): Theme {
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  return savedTheme ?? "system";
}

function subscribeToTheme(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const notify = () => {
    applyThemeToDocument(readStoredTheme());
    callback();
  };
  const timeoutId = window.setTimeout(notify, 0);

  mediaQuery.addEventListener("change", notify);
  window.addEventListener("storage", notify);
  window.addEventListener(THEME_CHANGE_EVENT, notify);

  return () => {
    window.clearTimeout(timeoutId);
    mediaQuery.removeEventListener("change", notify);
    window.removeEventListener("storage", notify);
    window.removeEventListener(THEME_CHANGE_EVENT, notify);
  };
}

function getThemeSnapshot() {
  const theme = readStoredTheme();
  const resolvedTheme = resolveTheme(theme);
  return `${theme}:${resolvedTheme}`;
}

function getServerThemeSnapshot() {
  return "unmounted:light";
}

function parseThemeSnapshot(snapshot: string): { theme: Theme; resolvedTheme: "light" | "dark"; mounted: boolean } {
  const [theme = "system", resolvedTheme = "light"] = snapshot.split(":");
  return {
    theme: (theme === "unmounted" ? "system" : theme) as Theme,
    resolvedTheme: resolvedTheme as "light" | "dark",
    mounted: theme !== "unmounted",
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const { theme, resolvedTheme, mounted } = parseThemeSnapshot(snapshot);

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    applyThemeToDocument(newTheme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, mounted, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
