import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // La lógica de inicialización es perfecta.
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
    
    const htmlElement = document.documentElement; // Es el <html>

    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
    

    
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      
      {children} 
    </ThemeContext.Provider>
  );
}