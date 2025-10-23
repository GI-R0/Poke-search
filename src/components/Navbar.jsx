import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import PokeballLogo from "../assets/ash.png";

const Navbar = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/search", label: "Buscar" },
    { to: "/about", label: "Acerca" },
  ];

  return (
    <nav
      className="bg-blue-600 dark:bg-gray-800 text-white shadow-md transition-colors duration-300"
      role="navigation"
      aria-label="Barra de navegación principal"
    >
      {/* Contenedor principal */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Ir a la página principal de PokeSearch"
            onClick={closeMenu}
          >
            <img
              src={PokeballLogo}
              alt="Logo de PokeSearch"
              className="w-8 h-8 drop-shadow-sm"
              loading="lazy"
            />
            <span className="text-xl font-bold tracking-wide">
              PokeSearch
            </span>
          </Link>

          {/* Enlaces (versión escritorio) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-200 ${
                    isActive ? "bg-blue-700 dark:bg-gray-700 font-bold text-yellow-300" : "hover:text-yellow-200"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Botones de acciones */}
          <div className="flex items-center gap-4">
            {/* Botón de cambio de tema */}
            <button
              onClick={toggleTheme}
              aria-label={`Cambiar a tema ${
                theme === "dark" ? "claro" : "oscuro"
              }`}
              className="p-3 rounded-full bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-400 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="text-xl">
                {theme === "dark" ? "☀️" : "🌙"}
              </span>
            </button>

            {/* Botón del menú móvil */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
              aria-label={
                isMenuOpen
                  ? "Cerrar menú de navegación"
                  : "Abrir menú de navegación"
              }
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-gray-800 border-t border-blue-500 dark:border-gray-700">
          <div className="flex flex-col items-center py-4 gap-4 text-lg">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg w-full text-center transition-all duration-200 ${
                    isActive ? "bg-blue-700 dark:bg-gray-700 font-bold text-yellow-300" : "hover:bg-blue-700 dark:hover:bg-gray-700 hover:text-yellow-200"
                  }`
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
            
            {/* Botón de tema en móvil */}
            <div className="mt-4 pt-4 border-t border-blue-500 dark:border-gray-700 w-full">
              <button
                onClick={() => {
                  toggleTheme();
                  closeMenu();
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-400 hover:scale-105 transition-all duration-200"
              >
                <span className="text-lg">
                  {theme === "dark" ? "☀️" : "🌙"}
                </span>
                <span className="font-medium">
                  {theme === "dark" ? "Tema Claro" : "Tema Oscuro"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
});

export default Navbar;
