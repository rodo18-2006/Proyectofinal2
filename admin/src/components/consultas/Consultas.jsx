import React, { useState, useEffect } from "react";
import { Container, Accordion, Button, Form } from "react-bootstrap";

export default function Consultas() {
  const [mensajes, setMensajes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [expanded, setExpanded] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const url = "http://localhost:5000/api/contact"; // URL fija, sin variable de entorno
    console.log("Fetch URL:", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);

  const handleRespuestaChange = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const enviarRespuesta = async (id) => {
    if (!respuestas[id] || respuestas[id].trim() === "") {
      alert("Por favor escribe una respuesta antes de enviar.");
      return;
    }

    alert(`Respuesta enviada:\n\n${respuestas[id]}`);

    try {
      await fetch(`${API_URL}/api/contact/${id}/respond`, {
        // <-- aquí también
        method: "PATCH",
      });

      setMensajes((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error al marcar como respondido:", err);
    }

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
          {mensajes.map(({ _id, name, subject, message, createdAt }) => (
            <Accordion.Item eventKey={_id} key={_id}>
              <Accordion.Header
                onClick={() => setExpanded(expanded === _id ? null : _id)}
              >
                <strong>{name}</strong> - {subject}{" "}
                <small className="text-muted ms-2">
                  {new Date(createdAt).toLocaleDateString()}
                </small>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <em>{message}</em>
                </p>
                <Form.Group controlId={`respuesta-${_id}`} className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={respuestas[_id] || ""}
                    onChange={(e) => handleRespuestaChange(_id, e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => enviarRespuesta(_id)}>
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
