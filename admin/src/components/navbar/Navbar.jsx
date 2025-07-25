"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/inicio" className="navbar-brand">
          Panel Admin
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          <Link to="/usuarios" className="navbar-link">
            👥 Usuarios
          </Link>
          <Link to="/clases" className="navbar-link">
            📅 Clases
          </Link>
          <Link to="/estadisticas" className="navbar-link">
            📊 Estadísticas
          </Link>
          <Link to="/configuracion" className="navbar-link">
            ⚙️ Configuración
          </Link>

          <div className="navbar-user">
            <Link to="/perfil" className="navbar-link">
              👤 Admin
            </Link>
            <button
              className="btn btn-outline"
              onClick={() => {
                // Acá deberías cerrar sesión correctamente
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <Link
          to="/usuarios"
          className="mobile-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Usuarios
        </Link>
        <Link
          to="/clases"
          className="mobile-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Clases
        </Link>
        <Link
          to="/estadisticas"
          className="mobile-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Estadísticas
        </Link>
        <Link
          to="/configuracion"
          className="mobile-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Configuración
        </Link>
        <button
          className="btn btn-outline mobile-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
