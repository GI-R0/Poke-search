import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => setOpen((v) => !v);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 641) setOpen(false);
    };

    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false);
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("click", onClickOutside);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  return (
    <nav aria-label="Navegación principal" className={open ? "nav-open" : ""} ref={navRef}>
      <div className="nav-container">
        <Link to="/" className="nav-logo-link" onClick={() => setOpen(false)}>
          <span className="nav-logo">POKESEARCH</span>
        </Link>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>

        <div id="primary-navigation" className={`nav-links-container ${open ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
            Inicio
          </Link>
          <Link to="/search" className="nav-link" onClick={() => setOpen(false)}>
            Buscar
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setOpen(false)}>
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
