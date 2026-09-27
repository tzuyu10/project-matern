"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const storageKey = "matern-theme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystemTheme = (event: MediaQueryListEvent) => {
      try { if (localStorage.getItem(storageKey)) return; } catch {}
      document.documentElement.classList.toggle("dark", event.matches);
      setDark(event.matches);
    };
    media.addEventListener("change", followSystemTheme);
    return () => media.removeEventListener("change", followSystemTheme);
  }, []);

  function toggleTheme() {
    const nextThemeIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextThemeIsDark);
    try { localStorage.setItem(storageKey, nextThemeIsDark ? "dark" : "light"); } catch {}
    setDark(nextThemeIsDark);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
