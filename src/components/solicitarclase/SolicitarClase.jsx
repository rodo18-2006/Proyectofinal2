/* import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import "./SolicitarClase.css";

export default function SolicitarClase() {
  const [clase, setClase] = useState("");
  const [entrenador, setEntrenador] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const clases = ["Musculación", "Yoga", "Funcional", "Spinning"];
  const entrenadores = [
    "Carlos Mendez",
    "Ana Rodriguez",
    "Miguel Torres",
    "Laura Gomez",
  ];

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!clase) nuevosErrores.clase = "Selecciona una clase";
    if (!entrenador) nuevosErrores.entrenador = "Selecciona un entrenador";
    if (!fecha) nuevosErrores.fecha = "Selecciona una fecha";
    if (!horario) nuevosErrores.horario = "Selecciona un horario";

    if (fecha && horario) {
      const [hora, minutos] = horario.split(":");
      const fechaSeleccionada = new Date(`${fecha}T${hora}:${minutos}`);
      const ahora = new Date();

      if (fechaSeleccionada < ahora) {
        nuevosErrores.horario = "La fecha y hora deben ser futuras";
      } else if (parseInt(hora) < 8 || parseInt(hora) >= 22) {
        nuevosErrores.horario =
          "El horario debe estar entre las 08:00 y las 21:59";
      }
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!validarCampos()) return;

    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      setError("No se encontró usuario logueado. Por favor inicia sesión.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/turnos/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId,
          clase,
          entrenador,
          fecha,
          horario,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Captura mensaje personalizado del backend (como el de 10 personas)
        setError(data.mensaje || "Error al reservar la clase");
        return;
      }

      setMensaje("✅ " + data.mensaje);
      setClase("");
      setEntrenador("");
      setFecha("");
      setHorario("");
      setErrors({});
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <Container className="solicitar-clase-container mt-4">
      <h2>📅 Solicitar Clase</h2>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Clase</Form.Label>
          <Form.Select
            value={clase}
            onChange={(e) => setClase(e.target.value)}
            isInvalid={!!errors.clase}
            required
          >
            <option value="">Selecciona una clase</option>
            {clases.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.clase}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Entrenador</Form.Label>
          <Form.Select
            value={entrenador}
            onChange={(e) => setEntrenador(e.target.value)}
            isInvalid={!!errors.entrenador}
            required
          >
            <option value="">Selecciona un entrenador</option>
            {entrenadores.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.entrenador}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            isInvalid={!!errors.fecha}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.fecha}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Horario</Form.Label>
          <Form.Control
            type="time"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            isInvalid={!!errors.horario}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.horario}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary">
          Reservar Clase
        </Button>

        {mensaje && (
          <Alert variant="success" className="mt-3">
            {mensaje}
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Form>
    </Container>
  );
}
 */

import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

export default function SolicitarClase() {
  const [clase, setClase] = useState("");
  const [entrenador, setEntrenador] = useState("");
  const [fecha, setFecha] = useState("");
  const [horario, setHorario] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  // Estado para saber qué campos están vacíos (errores de validación)
  const [errores, setErrores] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    const nuevosErrores = {};
    if (!clase) nuevosErrores.clase = true;
    if (!entrenador) nuevosErrores.entrenador = true;
    if (!fecha) nuevosErrores.fecha = true;
    if (!horario) nuevosErrores.horario = true;

    setErrores(nuevosErrores);

    // Si hay algún error, no continuar
    if (Object.keys(nuevosErrores).length > 0) {
      setError("Por favor completa todos los campos obligatorios.");
      setMensaje(null);
      return;
    }

    // ... aquí sigue la lógica de validación de fecha y hora y el fetch

    const hora = parseInt(horario.split(":")[0]);
    const fechaHora = new Date(`${fecha}T${horario}`);
    const ahora = new Date();

    if (fechaHora < ahora) {
      setError("No puedes reservar en el pasado");
      setMensaje(null);
      return;
    }

    if (hora < 8 || hora >= 22) {
      setError("El horario debe estar entre las 08:00 y 21:59");
      setMensaje(null);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/turnos/reservar",
        {
          usuarioId: "usuario-demo",
          clase,
          entrenador,
          fecha,
          horario,
        }
      );

      setMensaje(response.data.mensaje);
      setError(null);
      setClase("");
      setEntrenador("");
      setFecha("");
      setHorario("");
      setErrores({});
    } catch (err) {
      setMensaje(null);
      setError(
        err.response?.data?.mensaje || "Ocurrió un error al reservar el turno"
      );
    }
  };

  return (
    <Container className="mt-4">
      <h2>Solicitar Clase</h2>
      {mensaje && <Alert variant="success">{mensaje}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Clase</Form.Label>
          <Form.Select
            value={clase} // aquí controlás clase, no entrenador
            onChange={(e) => setClase(e.target.value)}
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
            Debes seleccionar una clase.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Entrenador</Form.Label>
          <Form.Select
            value={entrenador}
            onChange={(e) => setEntrenador(e.target.value)}
            isInvalid={!!errores.entrenador}
          >
            <option value="">Selecciona un entrenador</option>
            <option value="Carlos Mendez">Carlos Mendez</option>
            <option value="Ana Rodriguez">Ana Rodriguez</option>
            <option value="Miguel Torres">Miguel Torres</option>
            <option value="Laura Gomez">Laura Gomez</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Debes seleccionar un entrenador.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            isInvalid={!!errores.fecha}
          />
          <Form.Control.Feedback type="invalid">
            La fecha es obligatoria.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Horario</Form.Label>
          <Form.Control
            type="time"
            min="08:00"
            max="21:59"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            isInvalid={!!errores.horario}
          />
          <Form.Control.Feedback type="invalid">
            El horario es obligatorio.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Reservar Clase
        </Button>
      </Form>
    </Container>
  );
}
