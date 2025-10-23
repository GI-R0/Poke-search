import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("theme", newTheme);
      } catch {
        // si falla, no se interrumpe el flujo
      }
      return newTheme;
    });
  };

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
