import { Link } from "react-router-dom";
import "./Plan.css";

const plans = [
  {
    id: "musculacion",
    name: "Plan Solo Musculación",
    price: "$25000",
    description: "Acceso completo al área de musculación",
    features: [
      "Acceso a sala de musculación",
      "Equipos de última generación",
      "Horarios flexibles",
      "Asesoramiento básico",
    ],
  },
  {
    id: "clases",
    name: "Plan Solo Clases",
    price: "$30000",
    description: "Acceso a todas nuestras clases grupales",
    features: [
      "Clases de spinning",
      "Yoga y pilates",
      "Zumba y aeróbicos",
      "Clases de funcional",
    ],
  },
  {
    id: "full",
    name: "Plan Full",
    price: "$45000",
    description: "Acceso completo a todas las instalaciones",
    features: [
      "Acceso a musculación",
      "Todas las clases grupales",
      "Entrenamiento personalizado",
      "Nutricionista incluido",
      "Descuentos en productos",
    ],
    popular: true,
  },
];

export default function Plans() {
  return (
    <section className="plans-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Planes</h2>
          <p className="section-subtitle">
            Elige el plan que mejor se adapte a tus necesidades y objetivos
          </p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.popular ? "popular" : ""}`}
            >
              {plan.popular && <div className="popular-badge">Más Popular</div>}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  {plan.price}
                  <span className="price-period">/mes</span>
                </div>
              </div>

              <div className="plan-features">
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="plan-footer">
                <Link
                  to={`/plan-details/${plan.id}`}
                  className={`btn ${
                    plan.popular ? "btn-primary" : "btn-outline-primary"
                  } btn-full`}
                >
                  Consultar Plan
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
