import React, { useState } from "react";
import { Table, Button, Container, Modal, Form, Alert } from "react-bootstrap";

export default function Clases() {
  const clases = [
    {
      dia: "Lunes",
      hora: "18:00",
      actividad: "Funcional",
      instructor: "Miguel Torres",
    },
    {
      dia: "Miércoles",
      hora: "10:00",
      actividad: "Yoga",
      instructor: "Ana Rodriguez",
    },
    {
      dia: "Viernes",
      hora: "19:00",
      actividad: "Spinning",
      instructor: "Laura Gomez",
    },
  ];

  // Estado modal
  const [showModal, setShowModal] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  // Formulario
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Abrir modal y prellenar clase
  const abrirModal = (actividad) => {
    setClaseSeleccionada(actividad);
    setShowModal(true);
    setError("");
    setSuccess(false);
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  // Validar y enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      setError("Por favor, completa nombre y email.");
      setSuccess(false);
      return;
    }

    // Aquí podrías enviar la data a un backend
    console.log("Solicitud enviada:", {
      nombre,
      email,
      mensaje,
      clase: claseSeleccionada,
    });

    setError("");
    setSuccess(true);
    // Opcional: cerrar modal tras unos segundos
    // setTimeout(() => cerrarModal(), 3000);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📅 Clases Disponibles</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Actividad</th>
            <th>Instructor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {clases.map(({ dia, hora, actividad, instructor }) => (
            <tr key={`${dia}-${hora}`}>
              <td>{dia}</td>
              <td>{hora}</td>
              <td>{actividad}</td>
              <td>{instructor}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => abrirModal(actividad)}
                >
                  Solicitar Clase
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitar Clase: {claseSeleccionada}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success">Solicitud enviada con éxito!</Alert>
          )}
          {!success && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMensaje">
                <Form.Label>Mensaje (opcional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Algo que quieras agregar"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Enviar Solicitud
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
