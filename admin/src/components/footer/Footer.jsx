import React from "react";
import "./Footer.css";

export default function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-container">
        <div className="admin-footer-left">
          <span className="admin-footer-brand">FitGym Admin Panel</span>
          <small>© 2025 FitGym. Todos los derechos reservados.</small>
        </div>

        <nav className="admin-footer-nav">
          <a href="/inicio" className="admin-footer-link">
            Inicio
          </a>
          <a href="/usuarios" className="admin-footer-link">
            Usuarios
          </a>
          <a href="/clases" className="admin-footer-link">
            Clases
          </a>
          <a href="/configuracion" className="admin-footer-link">
            Configuración
          </a>
        </nav>
      </div>
    </footer>
  );
}
