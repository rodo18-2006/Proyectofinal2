import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminInicio.css";

export default function AdminInicio({ nombreAdmin }) {
  const [clasesHoy, setClasesHoy] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clases")
      .then((res) => res.json())
      .then((data) => {
        // Fecha de hoy en formato YYYY-MM-DD
        const hoy = new Date().toISOString().split("T")[0];
        
        // Filtrar solo las clases cuya fecha coincida con hoy
        const filtradas = data.filter(
          (clase) => clase.fecha && clase.fecha.split("T")[0] === hoy
        );

        setClasesHoy(filtradas);
      })
      .catch((err) => console.error("Error al cargar clases:", err));
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
              {clasesHoy.map(
                ({ _id, nombre, entrenador, horario, inscritos }) => (
                  <div key={_id} className="clase-card">
                    <h4>{nombre}</h4>
                    <p>
                      <strong>Profesor/a:</strong>{" "}
                      {entrenador ? (
                        entrenador
                      ) : (
                        <span style={{ fontStyle: "italic", color: "gray" }}>
                          No especificado
                        </span>
                      )}
                    </p>

                    <p>
                      <strong>Profesor/a:</strong>{" "}
                      {entrenador ? (
                        entrenador
                      ) : (
                        <span style={{ fontStyle: "italic", color: "gray" }}>
                          No especificado
                        </span>
                      )}
                    </p>

                    <p>
                      <strong>Profesor/a:</strong>{" "}
                      {entrenador ? (
                        entrenador
                      ) : (
                        <span style={{ fontStyle: "italic", color: "gray" }}>
                          0
                        </span>
                      )}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        <div className="admin-grid">
          <Link to="/usuarios" className="admin-card">
            <h3>👥 Usuarios registrados</h3>
          </Link>

          <Link to="/clases" className="admin-card">
            <h3>📅 Clases programadas</h3>
          </Link>

          <Link to="/turnos-solicitados" className="admin-card">
            <h3>Turnos solicitados</h3>
          </Link>

          <Link to="/consultas" className="admin-card">
            <h3>💬 Consultas</h3>
          </Link>

          <Link to="/cuotas-pagadas" className="admin-card">
            <h3>💰 Cuotas pagadas</h3>
          </Link>
        </div>
      </div>
    </section>
  );
}
