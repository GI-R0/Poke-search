import React, { memo } from "react";
import { Link } from "react-router-dom";
import PikachuLogo from "../assets/pokemon.png";
import { useTheme } from "../hooks/useTheme";

const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const links = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-500'} text-white`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        
        <Link to="/" className="flex items-center gap-3" aria-label="Ir a inicio">
          <img
            src={PikachuLogo}
            alt="Logo Pokémon"
            className="w-16 h-16 aspect-square object-contain rounded-full shadow-md"
            width="64"
            height="64"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="font-bold text-xl tracking-wide">PokeSearch</span>
        </Link>

        
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="hover:text-yellow-300 transition-colors duration-300 text-lg font-medium"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
});

export default Navbar;
