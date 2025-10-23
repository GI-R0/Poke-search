import React from "react";
import PikachuLogo from "../assets/pokemon.png";

const Footer = React.memo(() => {
  return (
    <footer
      className="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-12 border-t border-gray-700 dark:border-gray-800 transition-colors duration-300"
      role="contentinfo"
      aria-label="Información del sitio"
    >
      <div className="flex flex-col items-center justify-center gap-3 max-w-5xl mx-auto px-4">
        <img
          src={PikachuLogo}
          alt="Logo de PokeSearch con Pikachu"
          className="w-12 h-12 drop-shadow-md"
          loading="lazy"
          decoding="async"
        />

        <p className="text-sm text-center text-gray-300 dark:text-gray-400">
          PokeSearch © {new Date().getFullYear()} — Proyecto educativo con{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-400 transition-colors"
          >
            PokeAPI
          </a>
        </p>
      </div>
    </footer>
  );
});

export default Footer;

