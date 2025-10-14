import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme"; // ⬅️ Asegúrate de que la ruta sea correcta
import PikachuLogo from "../assets/pokemon.png"; 

const Navbar = memo(function AppNavbar() {
  // 1. Desestructurar 'theme' y 'toggleTheme' del hook
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo y Título */}
        <Link to="/" className="flex items-center space-x-3 transition-opacity hover:opacity-80">
          <img 
            src={PikachuLogo} 
            alt="Logo Pokeball" 
            className="w-8 h-8"
          />
          <span className="text-xl font-bold tracking-wider">PokeSearch</span>
        </Link>

        {/* Links y Botón de Tema */}
        <div className="flex items-center space-x-6">
          
          {/* Links de Navegación */}
          <div className="hidden sm:flex space-x-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "font-bold border-b-2 border-white" : "hover:text-gray-200 transition"
              }
            >
              Pokédex
            </NavLink>
            <NavLink 
              to="/search" 
              className={({ isActive }) => 
                isActive ? "font-bold border-b-2 border-white" : "hover:text-gray-200 transition"
              }
            >
              Buscar
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "font-bold border-b-2 border-white" : "hover:text-gray-200 transition"
              }
            >
              Acerca
            </NavLink>
          </div>

          {/* Botón de Alternar Tema */}
          <button
            // 2. Adjuntar la función de alternar al evento onClick
            onClick={toggleTheme}
            aria-label="Alternar tema oscuro y claro"
            className="p-2 rounded-full transition-colors duration-300 
                       bg-white text-blue-600 dark:bg-gray-700 dark:text-yellow-400
                       hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            {/* 3. Mostrar el ícono correcto basado en el estado 'theme' */}
            {theme === 'dark' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> // Sol (Light Mode)
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg> // Luna (Dark Mode)
            )}
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;