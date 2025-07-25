import React, { useState } from "react";
import { Container, Accordion, Button, Form } from "react-bootstrap";


export default function Consultas() {
  // Datos de ejemplo con mensajes sin responder
  const mensajesEjemplo = [
    {
      id: 1,
      usuario: "María González",
      asunto: "Consulta sobre horarios",
      mensaje:
        "Hola, quisiera saber si hay clases de spinning los fines de semana.",
      fecha: "2025-07-18",
      respondido: false,
    },
    {
      id: 2,
      usuario: "Juan Pérez",
      asunto: "Problema con mi inscripción",
      mensaje: "No puedo inscribirme a la clase de yoga, me da error.",
      fecha: "2025-07-19",
      respondido: false,
    },
    {
      id: 3,
      usuario: "Sofía Rodríguez",
      asunto: "Pago pendiente",
      mensaje: "¿Puedo pagar la mensualidad en efectivo en el gimnasio?",
      fecha: "2025-07-19",
      respondido: false,
    },
    {
      id: 4,
      usuario: "Carlos Martínez",
      asunto: "Consulta sobre entrenadores",
      mensaje:
        "¿Hay disponibilidad para entrenamientos personales los sábados?",
      fecha: "2025-07-20",
      respondido: false,
    },
    {
      id: 5,
      usuario: "Lucía Fernández",
      asunto: "Duda sobre horarios",
      mensaje: "¿Las clases de yoga se pueden tomar en la mañana?",
      fecha: "2025-07-20",
      respondido: false,
    },
    {
      id: 6,
      usuario: "Martín Gómez",
      asunto: "Solicitud de cambio de clase",
      mensaje:
        "Quisiera cambiar mi clase de musculación al horario de la tarde.",
      fecha: "2025-07-21",
      respondido: false,
    },
    {
      id: 7,
      usuario: "Ana Sánchez",
      asunto: "Consulta sobre pagos",
      mensaje:
        "¿Puedo pagar la membresía mensual a través de transferencia bancaria?",
      fecha: "2025-07-21",
      respondido: false,
    },
    {
      id: 8,
      usuario: "Jorge López",
      asunto: "Consulta general",
      mensaje: "¿Hay clases de pilates disponibles para principiantes?",
      fecha: "2025-07-22",
      respondido: false,
    },
    {
      id: 9,
      usuario: "Jose Ramallo",
      asunto: "Consulta general",
      mensaje: "¿De cuanto tiempo son las clases mayormente?",
      fecha: "2025-07-22",
      respondido: false,
    },
    {
      id: 8,
      usuario: "Alejandra Veliz",
      asunto: "Consulta general",
      mensaje: "¿Podemos tener las clases todos los dias de la semana o solo van alternando?",
      fecha: "2025-07-22",
      respondido: false,
    },
  ];


  const [mensajes, setMensajes] = useState(mensajesEjemplo);
  const [respuestas, setRespuestas] = useState({}); // para guardar texto de respuesta
  const [expanded, setExpanded] = useState(null);

  const handleRespuestaChange = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const enviarRespuesta = (id) => {
    if (!respuestas[id] || respuestas[id].trim() === "") {
      alert("Por favor escribe una respuesta antes de enviar.");
      return;
    }
    alert(
      `Respuesta enviada a ${mensajes.find((m) => m.id === id).usuario}:\n\n${
        respuestas[id]
      }`
    );

    // Marcar como respondido y quitar del listado
    setMensajes((prev) => prev.filter((m) => m.id !== id));

    // Opcional: limpiar la respuesta
    setRespuestas((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📩 Consultas sin responder</h2>
      {mensajes.length === 0 ? (
        <p className="text-center">No hay mensajes sin responder.</p>
      ) : (
        <Accordion className="container-con-mensaje" activeKey={expanded}>
          {mensajes.map(({ id, usuario, asunto, mensaje, fecha }) => (
            <Accordion.Item eventKey={id.toString()} key={id}>
              <Accordion.Header
                onClick={() =>
                  setExpanded(expanded === id.toString() ? null : id.toString())
                }
              >
                <strong>{usuario}</strong> - {asunto}{" "}
                <small className="text-muted ms-2">{fecha}</small>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <em>{mensaje}</em>
                </p>
                <Form.Group controlId={`respuesta-${id}`} className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={respuestas[id] || ""}
                    onChange={(e) => handleRespuestaChange(id, e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => enviarRespuesta(id)}>
                  Enviar respuesta
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}
