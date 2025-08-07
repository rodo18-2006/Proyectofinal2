import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Spinner } from "react-bootstrap";

function InscripcionesAdmin() {
  const [inscripciones, setInscripciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerTurnos = async () => {
      try {
        const respuesta = await fetch("http://localhost:5000/api/turnos"); // ajustá el puerto si es necesario
        const data = await respuesta.json();
        setInscripciones(data);
      } catch (error) {
        console.error("Error al obtener los turnos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerTurnos();
  }, []);

  const eliminarInscripcion = async (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro que quieres eliminar esta inscripción?"
    );
    if (!confirmacion) return;

    try {
      const respuesta = await fetch(`http://localhost:5000/api/turnos/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) throw new Error("No se pudo eliminar");

      setInscripciones(inscripciones.filter((ins) => ins._id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Hubo un problema al eliminar la inscripción.");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📋 Lista de Inscripciones a Clases</h2>

      {cargando ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : inscripciones.length === 0 ? (
        <p className="text-center">No hay personas inscritas aún.</p>
      ) : (
        <ListGroup>
          {inscripciones.map((inscripcion) => (
            <ListGroup.Item
              key={inscripcion._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>👤 {inscripcion.usuarioId}</strong> <br />
                Clase: <strong>{inscripcion.clase}</strong> <br />
                Entrenador: {inscripcion.entrenador} <br />
                Fecha: {inscripcion.fecha} <br />
                Horario: {inscripcion.horario}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => eliminarInscripcion(inscripcion._id)}
              >
                🗑️ Eliminar
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}

export default InscripcionesAdmin;
