import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { lockScroll, unlockScroll } from "../utils/scrollLock";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const firstMobileLinkRef = useRef(null);

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

  // prevent body scroll when menu is open (counter-based to support multiple lockers)
  useEffect(() => {
    if (open) lockScroll();
    return () => {
      if (open) unlockScroll();
    };
  }, [open]);

  // close on Escape when mobile menu is open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // manage focus: move focus to first link when opened; return to toggle button when closed
  useEffect(() => {
    if (open) {
      // wait for animation to complete before focusing
      const t = setTimeout(() => {
        firstMobileLinkRef.current?.focus();
      }, 260);
      return () => clearTimeout(t);
    } else {
      // return focus to the toggle button when closing
      toggleBtnRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav aria-label="Navegación principal" className="relative z-50" ref={navRef}>
        <div className="max-w-7xl mx-auto flex items-center px-4 h-[var(--header-height)]">
          <Link to="/" className="flex items-center no-underline" onClick={() => setOpen(false)}>
            <span
              className="text-accent text-lg font-extrabold tracking-wider uppercase"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              POKESEARCH
            </span>
          </Link>

          {/* hamburger - visible on small screens */}
          <button
            ref={toggleBtnRef}
            className="ml-auto inline-flex sm:hidden items-center p-2"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="primary-navigation mobile-navigation"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span className={`block w-6 h-[2px] bg-white transform transition-all ${open ? "rotate-45 translate-y-1.5" : "-translate-y-1.5"}`} />
            <span className={`block w-6 h-[2px] bg-white my-1 transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`block w-6 h-[2px] bg-white transform transition-all ${open ? "-rotate-45 -translate-y-1.5" : "translate-y-1.5"}`} />
          </button>

          {/* Desktop links */}
          <div id="primary-navigation" className="hidden sm:flex items-center gap-5 ml-auto pr-4">
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

          {/* Mobile panel */}
          <div
            id="mobile-navigation"
            aria-hidden={!open}
            role="dialog"
            aria-modal={open}
            tabIndex={-1}
            className={`fixed top-[var(--header-height)] right-0 bg-bg-secondary p-4 flex flex-col gap-4 w-[calc(100%-2rem)] max-w-[340px] z-50 transform transition-transform duration-300 shadow-lg sm:hidden ${
              open ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <Link ref={firstMobileLinkRef} to="/" className="nav-link" onClick={() => setOpen(false)}>
              Inicio
            </Link>
            <Link to="/search" className="nav-link" onClick={() => setOpen(false)}>
              Buscar
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setOpen(false)}>
              Acerca
            </Link>

            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              aria-label="Cambiar tema"
              aria-pressed={theme === "dark"}
              className="btn"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
