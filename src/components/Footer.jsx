import React, { memo } from "react";
// ⚠️ Removed unused import: useTheme is not needed here
import PikachuLogo from "../assets/pokemon.png"; 

// Using a standard function declaration with memo for cleaner syntax
const Footer = memo(function AppFooter() {
  return (
    <footer 
      // ✅ Using Tailwind dark mode classes for professional theming
      className="bg-gray-800 dark:bg-gray-900 text-white p-4 mt-8"
    >
      <div className="flex flex-col items-center justify-center gap-3 max-w-5xl mx-auto">
        <img
          src={PikachuLogo}
          alt="Logo PokeSearch"
          // ❌ The error-causing 's' has been removed
          className="w-16 h-16 aspect-square object-contain"
          width="64"
          height="64"
          loading="lazy"
          decoding="async"
        />
        <p className="text-sm">
            PokeSearch © {new Date().getFullYear()} - Proyecto educativo con PokeAPI
        </p>
      </div>
    </footer>
  );
});

export default Footer;