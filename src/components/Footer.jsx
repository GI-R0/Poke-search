import React, { memo } from "react";
import { useTheme } from "../hooks/useTheme";
import PikachuLogo from "../assets/pokemon.png";

const Footer = memo(function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800'} text-white p-4 mt-8 text-center`}>
      <div className="flex flex-col items-center gap-3">
        <img
          src={PikachuLogo}
          alt="Logo PokeSearch"
          className="w-16 h-16 aspect-square object-contain"
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
        />
        <p>PokeSearch © {new Date().getFullYear()} - Proyecto educativo con PokeAPI</p>
      </div>
    </footer>
  );
});

export default Footer;
