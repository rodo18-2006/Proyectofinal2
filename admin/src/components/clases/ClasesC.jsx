import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export default function ClasesC() {
  const [clases, setClases] = useState([
    {
      nombre: "Musculación",
      entrenador: "Carlos Méndez",
      especialidad: "Entrenador Personal",
      experiencia: "8 años",
      horario: "Lunes a Viernes, 9:00 - 20:00",
    },
    {
      nombre: "Funcional",
      entrenador: "Miguel Torres",
      especialidad: "Especialista en Funcional",
      experiencia: "6 años",
      horario: "Lunes, Miércoles y Viernes, 19:00 - 20:00",
    },
    {
      nombre: "Yoga",
      entrenador: "Ana Rodríguez",
      especialidad: "Instructora de Yoga",
      experiencia: "5 años",
      horario: "Martes y Jueves, 18:00 - 19:00",
    },
    {
      nombre: "Spinning",
      entrenador: "Laura Gómez",
      especialidad: "Instructora de Spinning",
      experiencia: "4 años",
      horario: "Lunes a Viernes, 8:00 - 9:00",
    },
    {
      nombre: "HIIT",
      entrenador: "Carlos Méndez",
      especialidad: "Entrenador Personal",
      experiencia: "8 años",
      horario: "Martes y Jueves, 19:00 - 20:00",
    },
    {
      nombre: "Zumba",
      entrenador: "Ana Rodríguez",
      especialidad: "Instructora de Yoga",
      experiencia: "5 años",
      horario: "Lunes, Miércoles y Viernes, 17:00 - 18:00",
    },
    {
      nombre: "Pilates",
      entrenador: "Laura Gómez",
      especialidad: "Instructora de Spinning",
      experiencia: "4 años",
      horario: "Lunes a Sábado, 10:00 - 11:00",
    },
    {
      nombre: "CrossFit",
      entrenador: "Miguel Torres",
      especialidad: "Especialista en Funcional",
      experiencia: "6 años",
      horario: "Martes, Jueves y Sábados, 7:00 - 8:00",
    },
  ]);
  const entrenadores = [
    {
      nombre: "Carlos Méndez",
      especialidad: "Entrenador Personal",
      experiencia: "8 años",
    },
    {
      nombre: "Miguel Torres",
      especialidad: "Especialista en Funcional",
      experiencia: "6 años",
    },
    {
      nombre: "Ana Rodríguez",
      especialidad: "Instructora de Yoga",
      experiencia: "5 años",
    },
    {
      nombre: "Laura Gómez",
      especialidad: "Instructora de Spinning",
      experiencia: "4 años",
    },
  ];


  const handleEntrenadorChange = (e) => {
    const selected = entrenadores.find((t) => t.nombre === e.target.value);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        entrenador: selected.nombre,
        especialidad: selected.especialidad,
        experiencia: selected.experiencia,
      }));
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    entrenador: "",
    especialidad: "",
    experiencia: "",
    horario: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleShowModal = (index = null) => {
    if (index !== null) {
      setFormData(clases[index]);
      setEditIndex(index);
    } else {
      setFormData({
        nombre: "",
        entrenador: "",
        especialidad: "",
        experiencia: "",
        horario: "",
      });
      setEditIndex(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      // Editar
      const nuevasClases = [...clases];
      nuevasClases[editIndex] = formData;
      setClases(nuevasClases);
    } else {
      // Agregar
      setClases([...clases, formData]);
    }
    handleCloseModal();
  };

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center flex-grow-1">📅 Clases Programadas</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          ➕ Agregar Clase
        </Button>
      </div>
      <Row>
        {clases.map((clase, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{clase.nombre}</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">
                  🧑‍🏫 {clase.entrenador} - {clase.especialidad}
                </Card.Subtitle>
                <Card.Text className="mb-1">📅 {clase.horario}</Card.Text>
                <Card.Text className="text-muted">
                  🔁 {clase.experiencia} de experiencia
                </Card.Text>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleShowModal(index)}
                >
                  ✏️ Editar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "Editar Clase" : "Agregar Clase"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombre" className="mb-2">
              <Form.Label>Nombre de la clase</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEntrenador" className="mb-2">
              <Form.Label>Entrenador</Form.Label>
              <Form.Select
                name="entrenador"
                value={formData.entrenador}
                onChange={handleEntrenadorChange}
              >
                <option value="">Seleccione un entrenador</option>
                {entrenadores.map((e, i) => (
                  <option key={i} value={e.nombre}>
                    {e.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formEspecialidad" className="mb-2">
              <Form.Label>Especialidad</Form.Label>
              <Form.Control
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formExperiencia" className="mb-2">
              <Form.Label>Experiencia</Form.Label>
              <Form.Control
                type="text"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formHorario" className="mb-2">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                type="text"
                name="horario"
                value={formData.horario}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editIndex !== null ? "Guardar Cambios" : "Agregar Clase"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
