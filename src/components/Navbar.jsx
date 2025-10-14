import React, { memo } from "react";
import { Link } from "react-router-dom";
import PikachuLogo from "../assets/pokemon.png";
import { useTheme } from "../hooks/useTheme";

const Navbar = memo(function AppNavbar() {
  const { theme, toggleTheme } = useTheme(); 
  
  const links = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "About", path: "/about" },
  ];

  return (
    
    <nav className="bg-blue-600 dark:bg-gray-800 text-white shadow-lg sticky top-0 z-10">
      
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        <Link to="/" className="flex items-center gap-3" aria-label="Ir a inicio">
          <img
            src={PikachuLogo}
            alt="Logo Pokémon"
            
            className="w-16 h-16 aspect-square object-contain rounded-full shadow-md bg-white p-1"
            width="64"
            height="64"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="font-bold text-xl tracking-wide">PokeSearch</span>
        </Link>

        
        <ul className="flex gap-6 items-center"> 
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                
                className="hover:text-yellow-400 transition-colors duration-300 text-lg font-medium"
              >
                {link.name}
              </Link>
            </li>
          ))}
          
          
          <li>
            <button 
              onClick={toggleTheme}
             
              className="p-2 rounded-full bg-white text-gray-800 dark:bg-gray-900 dark:text-yellow-400 
                         shadow-inner hover:scale-105 transition-transform"
              aria-label="Alternar modo claro y oscuro"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;