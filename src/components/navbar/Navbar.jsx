"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../login/LoginModal";
import "./Navbar.css";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔁 Verificamos si hay sesión guardada
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(logged);
    setIsAdmin(admin);
  }, []);

  // ✅ Login exitoso
  const handleLogin = (isAdminUser) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", isAdminUser ? "true" : "false");
    setShowLogin(false);
  };

  // ❌ Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            FitGym
          </Link>

          <div className="navbar-menu desktop-menu">
            <Link to="/" className="navbar-link">
              Inicio
            </Link>
            <Link to="/about" className="navbar-link">
              Nosotros
            </Link>
            <Link to="/contact" className="navbar-link">
              Contacto
            </Link>

            {isLoggedIn && isAdmin && (
              <>
                
                <Link to="/clases" className="navbar-link">
                  📅 Clases
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <div className="navbar-user">
                <Link to="/cuenta" className="navbar-link">
                  👤 Mi Cuenta
                </Link>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setShowLogin(true)}
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
          </button>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="mobile-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/about"
            className="mobile-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link
            to="/contact"
            className="mobile-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Contacto
          </Link>

          {isLoggedIn && isAdmin && (
            <>
              <Link
                to="/admin/users"
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Usuarios
              </Link>
              <Link
                to="/admin/classes"
                className="mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Clases
              </Link>
            </>
          )}

          {isLoggedIn ? (
            <button
              className="btn btn-outline mobile-btn"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          ) : (
            <button
              className="btn btn-primary mobile-btn"
              onClick={() => {
                setShowLogin(true);
                setIsMenuOpen(false);
              }}
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
