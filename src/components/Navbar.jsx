import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import pikachu from "../assets/pikachu.png";

const Navbar = React.memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="bg-blue-600 dark:bg-gray-800 text-white shadow-md transition-colors duration-300"
      aria-label="Barra de navegación principal"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Ir a la página principal de PokeSearch"
          >
            <img
              src={pikachu}
              alt="Ícono de Pikachu"
              className="w-8 h-8 drop-shadow-sm"
              loading="lazy"
            />
            <span className="text-xl font-bold tracking-wide">PokeSearch</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={`Cambiar al tema ${
                theme === "dark" ? "claro" : "oscuro"
              }`}
              className="p-3 rounded-full bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-400 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-300 dark:border-yellow-500"
            >
              <span className="text-xl">{theme === "dark" ? "☀️" : "🌙"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
