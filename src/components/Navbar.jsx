import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav aria-label="Navegación principal">
      <div className="nav-container">
        <Link to="/" className="nav-logo-link">
          <span className="nav-logo">POKESEARCH</span>
        </Link>

        <div className="nav-links-container">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/search" className="nav-link">
            Buscar
          </Link>
          <Link to="/about" className="nav-link">
            Acerca
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            aria-pressed={theme === "dark"}
            className="ml-4 btn theme-toggle"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
