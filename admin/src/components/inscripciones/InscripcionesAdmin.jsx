import React, { useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";

function InscripcionesAdmin() {
  const inscripcionesEjemplo = [
    {
      id: 1,
      usuario: "Rodolfo Juarez",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 2,
      usuario: "Sofía Pérez",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 3,
      usuario: "Mateo Gómez",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 4,
      usuario: "Celeste López",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 5,
      usuario: "Raul Gimenez",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 6,
      usuario: "Carlos Auzqui",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 7,
      usuario: "Maria Laura",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 8,
      usuario: "Marcela Bullaude",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 9,
      usuario: "Jose Ramallo",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },

    {
      id: 10,
      usuario: "Maximo Montero",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 11,
      usuario: "Lautaro Salinas",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 12,
      usuario: "Florencia Ruiz",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 13,
      usuario: "Joaquín Cabrera",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 14,
      usuario: "Valentina Ríos",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 15,
      usuario: "Ignacio Morales",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 16,
      usuario: "Camila Herrera",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 17,
      usuario: "Matías Fernández",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 18,
      usuario: "Agustina Vega",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 19,
      usuario: "Federico Alvarez",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 20,
      usuario: "Mariana Torres",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 21,
      usuario: "Nicolás Castro",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 22,
      usuario: "Paula Díaz",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 23,
      usuario: "Santiago López",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 24,
      usuario: "Lucía Moreno",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 25,
      usuario: "Gonzalo Jiménez",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 26,
      usuario: "Martina Sánchez",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 27,
      usuario: "Bruno Díaz",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 28,
      usuario: "Julieta Reyes",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 29,
      usuario: "Emiliano Torres",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 30,
      usuario: "Florencia Gómez",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 31,
      usuario: "Diego Ramírez",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 32,
      usuario: "Isabella Medina",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 33,
      usuario: "Javier Castillo",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 34,
      usuario: "Sofía Herrera",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 35,
      usuario: "Tomás Vega",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 36,
      usuario: "Valeria Rojas",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 37,
      usuario: "Martín Paredes",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
    {
      id: 38,
      usuario: "Camila Flores",
      clase: "Spinning",
      entrenador: "Laura Gomez",
      horario: "Jueves 19:00 - 20:00",
    },
    {
      id: 39,
      usuario: "Lucas Morales",
      clase: "Musculación",
      entrenador: "Carlos Mendez",
      horario: "Lunes 10:00 - 11:00",
    },
    {
      id: 40,
      usuario: "Natalia Ortiz",
      clase: "Yoga",
      entrenador: "Ana Rodriguez",
      horario: "Martes 18:00 - 19:00",
    },
    {
      id: 41,
      usuario: "Agustín Torres",
      clase: "Funcional",
      entrenador: "Miguel Torres",
      horario: "Miércoles 7:00 - 8:00",
    },
  ];


  const [inscripciones, setInscripciones] = useState(inscripcionesEjemplo);

  const eliminarInscripcion = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro que quieres eliminar esta inscripción?"
    );
    if (!confirmacion) return;

    const nuevasInscripciones = inscripciones.filter((ins) => ins.id !== id);
    setInscripciones(nuevasInscripciones);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📋 Lista de Inscripciones a Clases</h2>

      {inscripciones.length === 0 ? (
        <p className="text-center">No hay personas inscritas aún.</p>
      ) : (
        <ListGroup>
          {inscripciones.map((inscripcion) => (
            <ListGroup.Item
              key={inscripcion.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>👤 {inscripcion.usuario}</strong> <br />
                Clase: <strong>{inscripcion.clase}</strong> <br />
                Entrenador: {inscripcion.entrenador} <br />
                Horario: {inscripcion.horario}
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => eliminarInscripcion(inscripcion.id)}
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
