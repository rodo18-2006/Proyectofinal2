import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminInicio.css";

export default function AdminInicio({ nombreAdmin }) {
  const [clasesHoy, setClasesHoy] = useState([]);

  useEffect(() => {
  
    const clasesMock = [
      {
        id: 1,
        detalle: "Yoga para principiantes",
        profesor: "Ana Rodriguez",
        fecha: "2025-07-20",
        hora: "10:00 AM",
        inscriptos: 12,
      },
      {
        id: 2,
        detalle: "Musculación avanzada",
        profesor: "Carlos Mendez",
        fecha: "2025-07-20",
        hora: "18:00 PM",
        inscriptos: 8,
      },
    ];
    setClasesHoy(clasesMock);
  }, []);

  return (
    <section className="admin-dashboard">
      <div className="container">
        <h2 className="admin-title">Panel del Administrador 🏋️‍♂️</h2>
        <p className="admin-subtitle">  
          ¡Bienvenido, <strong>{nombreAdmin}</strong>! Aquí tienes un resumen
          actualizado de tu gimnasio.
        </p>
        <p className="admin-version">Versión del sistema: 1.0.0</p>
       
        <section className="clases-hoy-section">
          <h3>Clases disponibles para hoy 🗓️</h3>

          {clasesHoy.length === 0 ? (
            <p>No hay clases programadas para hoy.</p>
          ) : (
            <div className="clases-list">
              {clasesHoy.map(({ id, detalle, profesor, hora, inscritos }) => (
                <div key={id} className="clase-card">
                  <h4>{detalle}</h4>
                  <p>
                    <strong>Profesor/a:</strong> {profesor}
                  </p>
                  <p>
                    <strong>Hora:</strong> {hora}
                  </p>
                  <p>
                    <strong>Inscritos:</strong> {inscritos}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="admin-grid">
          <Link to="/usuarios" className="admin-card">
            <h3>👥 Usuarios registrados</h3>
            <p>18 miembros activos</p>
          </Link>

          <Link to="/clases" className="admin-card">
            <h3>📅 Clases programadas</h3>
            <p>12 clases esta semana</p>
          </Link>

          <Link to="/inscripciones" className="admin-card">
            <h3>📝 Inscripciones</h3>
            <p>31 nuevos inscriptos</p>
          </Link>

          <Link to="/consultas" className="admin-card">
            <h3>💬 Consultas</h3>
            <p>8 mensajes sin responder</p>
          </Link>

          <Link to="/cuotas-pagadas" className="admin-card">
            <h3>💰 Cuotas pagadas</h3>
            <p>13 cuotas recibidas este mes</p>
          </Link>

          <Link to="/cuotas-pendientes" className="admin-card">
            <h3>⚠️ Cuotas pendientes</h3>
            <p>5 pagos atrasados</p>
          </Link>

          <Link to="/metas" className="admin-card">
            <h3>📊 Cumplimiento de metas</h3>
            <p>75% de asistencia mensual</p>
          </Link>

          <Link to="/alertas" className="admin-card alert-card">
            <h3>🚨 Alertas importantes</h3>
            <p>3 membresías a punto de expirar</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
