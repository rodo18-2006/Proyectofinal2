/* import React, { useState } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";

export default function MiCuenta({ onLogout }) {
  // Datos simulados
  const planesDisponibles = ["Básico", "Intermedio", "Premium"];
  const entrenadores = [
    "Carlos Mendez",
    "Ana Rodriguez",
    "Miguel Torres",
    "Laura Gomez",
  ];

  // Estado del usuario
  const [nombre, setNombre] = useState("Juan Pérez");
  const [email, setEmail] = useState("juanperez@example.com");
  const [plan, setPlan] = useState("Intermedio");
  const [trainer, setTrainer] = useState("Miguel Torres");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleGuardar = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!nombre.trim() || !email.trim()) {
      setErrorMsg("Nombre y email no pueden estar vacíos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Por favor ingresa un email válido.");
      return;
    }

    setSuccessMsg("Cambios guardados con éxito.");
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">👤 Mi Cuenta</h2>
      <Card>
        <Card.Body>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}

          <Form onSubmit={handleGuardar}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlan">
              <Form.Label>Plan Actual</Form.Label>
              <Form.Select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                {planesDisponibles.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTrainer">
              <Form.Label>Entrenador Asignado</Form.Label>
              <Form.Select
                value={trainer}
                onChange={(e) => setTrainer(e.target.value)}
              >
                {entrenadores.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="me-2">
              Guardar Cambios
            </Button>
            
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
 */


import React, { useState, useEffect } from "react";
import { Card, Container, Form, Button, Alert } from "react-bootstrap";

export default function MiCuenta({ onLogout }) {
  // Datos simulados
  const planesDisponibles = ["Básico", "Intermedio", "Premium"];
  const entrenadores = [
    "Carlos Mendez",
    "Ana Rodriguez",
    "Miguel Torres",
    "Laura Gomez",
  ];

  // Estados iniciales vacíos, se llenan desde localStorage en useEffect
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("Intermedio");
  const [trainer, setTrainer] = useState("Miguel Torres");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

useEffect(() => {
  const usuarioString = localStorage.getItem("usuario");
  if (usuarioString) {
    try {
      const usuario = JSON.parse(usuarioString);
      setNombre(usuario?.nombre || "");
      setEmail(usuario?.email || "");
    } catch (error) {
      console.error("Error al parsear usuario:", error);
      // Limpio el valor inválido para evitar que siga fallando
      localStorage.removeItem("usuario");
    }
  }
}, []);


  const handleGuardar = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!nombre.trim() || !email.trim()) {
      setErrorMsg("Nombre y email no pueden estar vacíos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Por favor ingresa un email válido.");
      return;
    }

    setSuccessMsg("Cambios guardados con éxito.");

    // Opcional: actualizar localStorage si cambian datos
    localStorage.setItem("nombreUsuario", nombre);
    localStorage.setItem("emailUsuario", email);
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">👤 Mi Cuenta</h2>
      <Card>
        <Card.Body>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}

          <Form onSubmit={handleGuardar}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlan">
              <Form.Label>Plan Actual</Form.Label>
              <Form.Select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                {planesDisponibles.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTrainer">
              <Form.Label>Entrenador Asignado</Form.Label>
              <Form.Select
                value={trainer}
                onChange={(e) => setTrainer(e.target.value)}
              >
                {entrenadores.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="me-2">
              Guardar Cambios
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
