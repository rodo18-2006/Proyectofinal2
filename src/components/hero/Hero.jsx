import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforma tu <span className="highlight">Cuerpo</span>
          </h1>
          <p className="hero-subtitle">
            Únete al mejor gimnasio de la ciudad. Equipos de última generación,
            entrenadores profesionales y un ambiente motivador te esperan.
          </p>
          <div className="hero-buttons">
            <Link to="/plans" className="btn btn-primary btn-large">
              Ver Planes
            </Link>
            <Link to="/contact" className="btn btn-outline btn-large">
              Contactanos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
