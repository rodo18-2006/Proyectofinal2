import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminInicio.css";

export default function AdminInicio({ nombreAdmin }) {
  const [clasesHoy, setClasesHoy] = useState([]);
  const [otrasClases, setOtrasClases] = useState([]);
  const [inscriptosPorClase, setInscriptosPorClase] = useState({});

  // Función para obtener los inscriptos agrupados por clase
  const obtenerInscriptos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/turnos");
      const turnos = await res.json();
      // Agrupar por clase
      const porClase = turnos.reduce((acc, turno) => {
        if (!acc[turno.clase]) acc[turno.clase] = [];
        acc[turno.clase].push(turno.usuarioId); // o nombre si lo guardás
        return acc;
      }, {});
      setInscriptosPorClase(porClase);
    } catch (error) {
      console.error("Error al cargar inscriptos:", error);
    }
  };

  useEffect(() => {
    // Cargar clases
    fetch("http://localhost:5000/api/clases")
      .then((res) => res.json())
      .then((data) => {
        const hoyStr = new Date().toISOString().split("T")[0];

        const ordenadas = data.sort((a, b) => {
          const fechaA = a.fecha ? new Date(a.fecha) : new Date(0);
          const fechaB = b.fecha ? new Date(b.fecha) : new Date(0);
          if (fechaA < fechaB) return -1;
          if (fechaA > fechaB) return 1;
          if (a.horario && b.horario) return a.horario.localeCompare(b.horario);
          return 0;
        });

        const filtradasHoy = ordenadas.filter(
          (clase) => clase.fecha && clase.fecha.split("T")[0] === hoyStr
        );
        const filtradasOtras = ordenadas.filter(
          (clase) => !clase.fecha || clase.fecha.split("T")[0] !== hoyStr
        );

        setClasesHoy(filtradasHoy);
        setOtrasClases(filtradasOtras);
      })
      .catch((err) => console.error("Error al cargar clases:", err));

    // Cargar inscriptos
    obtenerInscriptos();
  }, []);

  return (
    <section className="admin-dashboard">
      <div className="container">
        <h2 className="admin-title">Panel del Administrador 🏋️‍♂️</h2>
        <p className="admin-subtitle">
          ¡Bienvenido<strong>{nombreAdmin}</strong>! Aquí tienes un resumen
          actualizado de tu gimnasio.
        </p>
        <p className="admin-version">Versión del sistema: 1.0.0</p>

        <section className="otras-clases-section mt-4">
          <h3> Clases programadas 📅</h3>

          {otrasClases.length === 0 ? (
            <p>No hay otras clases programadas.</p>
          ) : (
            <div className="clases-list">
              {otrasClases.map(
                ({ _id, nombre, entrenador, fecha, horario }) => (
                  <div key={_id} className="clase-card">
                    <h4>{nombre}</h4>
                    <p>
                      <strong>Profesor/a:</strong>{" "}
                      {entrenador || (
                        <span style={{ fontStyle: "italic", color: "gray" }}>
                          No especificado
                        </span>
                      )}
                    </p>
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {fecha
                        ? new Date(fecha).toLocaleDateString()
                        : "No definida"}
                    </p>
                    <p>
                      <strong>Horario:</strong> {horario || "No definido"}
                    </p>
                    
                  </div>
                )
              )}
            </div>
          )}
        </section>

        <div className="admin-grid mt-5">
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
