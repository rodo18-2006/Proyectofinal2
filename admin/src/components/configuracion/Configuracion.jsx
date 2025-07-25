import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";

export default function Configuracion() {
  const [precios, setPrecios] = useState({
    mensual: 5000,
    trimestral: 13500,
    anual: 48000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrecios((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = () => {
    alert("Precios actualizados correctamente");
    // Aquí podrías hacer una petición al backend para guardar
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">⚙️ Configuración de Planes</h2>
      <Card className="p-4 shadow">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Plan Mensual</Form.Label>
            <Form.Control
              type="number"
              name="mensual"
              value={precios.mensual}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plan Trimestral</Form.Label>
            <Form.Control
              type="number"
              name="trimestral"
              value={precios.trimestral}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Plan Anual</Form.Label>
            <Form.Control
              type="number"
              name="anual"
              value={precios.anual}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleGuardar}>
            Guardar Cambios
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
