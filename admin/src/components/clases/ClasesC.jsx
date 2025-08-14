import React, { useState, useEffect } from "react";
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
  const [clases, setClases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errores, setErrores] = useState({});

  const [formData, setFormData] = useState({
    clase: "",
    entrenador: "",
    especialidad: "",
    experiencia: "",
    horario: "",
    fecha: "",
  });

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

  const obtenerClases = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/clases");
      const data = await res.json();
      setClases(data);
    } catch (err) {
      console.error("Error al cargar clases:", err);
    }
  };

  useEffect(() => {
    obtenerClases();
  }, []);

  const handleShowModal = (index = null) => {
    if (index !== null) {
      setFormData(clases[index]);
      setEditIndex(index);
    } else {
      setFormData({
        clase: "",
        entrenador: "",
        especialidad: "",
        experiencia: "",
        horario: "",
        fecha: "",
      });
      setEditIndex(null);
    }
    setErrores({});
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEntrenadorChange = (e) => {
    const selected = entrenadores.find((t) => t.nombre === e.target.value);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        entrenador: selected.nombre,
        especialidad: selected.especialidad,
        experiencia: selected.experiencia,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        entrenador: "",
        especialidad: "",
        experiencia: "",
      }));
    }
  };

  const validarFormulario = () => {
    let nuevosErrores = {};
    if (!formData.clase) nuevosErrores.clase = "Debes seleccionar una clase.";
    if (!formData.entrenador)
      nuevosErrores.entrenador = "Selecciona un entrenador.";
    if (!formData.horario) nuevosErrores.horario = "Ingresa un horario.";
    if (!formData.fecha) nuevosErrores.fecha = "Selecciona una fecha.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) return;
    try {
      if (editIndex !== null) {
        const claseEditada = clases[editIndex];
        await fetch(`http://localhost:5000/api/clases/${claseEditada._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:5000/api/clases", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
      setShowModal(false);
      obtenerClases();
    } catch (error) {
      console.error("Error al guardar clase:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta clase?"))
      return;
    try {
      await fetch(`http://localhost:5000/api/clases/${id}`, {
        method: "DELETE",
      });
      obtenerClases();
    } catch (error) {
      console.error("Error de conexión al eliminar clase:", error);
    }
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
                <Card.Title>{clase.clase}</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">
                  🧑‍🏫 {clase.entrenador} - {clase.especialidad}
                </Card.Subtitle>
                <Card.Text className="mb-1">
                  📆 {new Date(clase.fecha).toLocaleDateString()}
                </Card.Text>
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
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDelete(clase._id)}
                >
                  🗑️ Eliminar
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
            <Form.Group controlId="formClase" className="mb-2">
              <Form.Label>Nombre de la clase</Form.Label>
              <Form.Select
                name="clase"
                value={formData.clase}
                onChange={handleChange}
                isInvalid={!!errores.clase}
              >
                <option value="">Selecciona una clase</option>
                <option value="Musculación">Musculación</option>
                <option value="Funcional">Funcional</option>
                <option value="Yoga">Yoga</option>
                <option value="Spinning">Spinning</option>
                <option value="HIT">HIT</option>
                <option value="Zumba">Zumba</option>
                <option value="Pilates">Pilates</option>
                <option value="CrossFit">CrossFit</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errores.clase}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEntrenador" className="mb-2">
              <Form.Label>Entrenador</Form.Label>
              <Form.Select
                name="entrenador"
                value={formData.entrenador}
                onChange={handleEntrenadorChange}
                isInvalid={!!errores.entrenador}
              >
                <option value="">Seleccione un entrenador</option>
                {entrenadores.map((e, i) => (
                  <option key={i} value={e.nombre}>
                    {e.nombre}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errores.entrenador}
              </Form.Control.Feedback>
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
                isInvalid={!!errores.horario}
              />
              <Form.Control.Feedback type="invalid">
                {errores.horario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formFecha" className="mb-2">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="fecha"
                value={
                  formData.fecha
                    ? new Date(formData.fecha).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                isInvalid={!!errores.fecha}
              />
              <Form.Control.Feedback type="invalid">
                {errores.fecha}
              </Form.Control.Feedback>
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
