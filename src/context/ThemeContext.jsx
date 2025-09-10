import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    
    if (typeof window === "undefined") return "light";
    
    try {
      if (localStorage.getItem("theme")) {
        return localStorage.getItem("theme");
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch (error) {
      console.warn("Error accediendo a localStorage:", error);
      return "light";
    }
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.warn("Error guardando en localStorage:", error);
      }
      return newTheme;
    });
  };

  
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;

    if (theme === "light") {
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#000000";
    } else {
      body.style.backgroundColor = "#111827"; 
      body.style.color = "#ffffff";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={
          theme === "light"
            ? "bg-white text-black min-h-screen"
            : "bg-gray-900 text-white min-h-screen"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
