import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo y descripción */}
          <div className="footer-section">
            <h3 className="footer-brand">FitGym</h3>
            <p className="footer-description">
              Tu gimnasio de confianza para alcanzar todos tus objetivos
              fitness.
            </p>
            <div className="social-links">
              <a
                href="https://www.facebook.com"
                className="social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                📘
              </a>
              <a
                href="https://www.instagram.com"
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                📷
              </a>
              <a
                href="https://twitter.com"
                className="social-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐦
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-section">
            <h4 className="footer-title">Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/plans" className="footer-link">
                  Planes
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div className="footer-section">
            <h4 className="footer-title">Horarios</h4>
            <ul className="footer-info">
              <li>Lunes - Viernes: 6:00 - 23:00</li>
              <li>Sábados: 8:00 - 20:00</li>
              <li>Domingos: 9:00 - 18:00</li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-section">
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-contact">
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                Juan Pablo II, T4103 San Miguel de Tucumán, Tucumán
              </li>
              <li className="contact-item">
                <span className="contact-icon">📞</span>
                +54 11 1234-5678
              </li>
              <li className="contact-item">
                <span className="contact-icon">✉️</span>
                info@fitgym.com
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © 2024 FitGym. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
