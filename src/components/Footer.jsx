import React from "react";

const Footer = () => {
  return (
    <footer
      className="footer py-8 mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
      role="contentinfo"
      aria-label="Pie de página del sitio"
    >
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <p>
          PokeSearch © {new Date().getFullYear()} — Proyecto educativo con{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            PokeAPI
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
