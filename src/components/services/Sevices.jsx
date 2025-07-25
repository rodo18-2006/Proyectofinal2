import "./Services.css";

const services = [
  {
    icon: "🏋️",
    title: "Musculación",
    description:
      "Equipos de última generación para todos los niveles de entrenamiento",
  },
  {
    icon: "👥",
    title: "Clases Grupales",
    description: "Variedad de clases: spinning, yoga, zumba, funcional y más",
  },
  {
    icon: "❤️",
    title: "Entrenamiento Personal",
    description: "Planes personalizados con entrenadores certificados",
  },
  {
    icon: "🏆",
    title: "Nutrición Deportiva",
    description: "Asesoramiento nutricional y suplementos de calidad",
  },
];

export default function Services() {
  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Todo lo que necesitas para alcanzar tus objetivos fitness
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
