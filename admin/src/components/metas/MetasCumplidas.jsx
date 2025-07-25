import React from "react";
import {
  Card,
  ProgressBar,
  Row,
  Col,
  Container,
  ListGroup,
} from "react-bootstrap";

const metas = [
  { nombre: "Lucía Fernández", objetivo: "Bajar 5kg", progreso: 90 },
  { nombre: "Marco Díaz", objetivo: "Aumentar masa muscular", progreso: 70 },
  { nombre: "Ana Rivas", objetivo: "Asistir 4 veces/semana", progreso: 100 },
  { nombre: "Bruno López", objetivo: "Mejorar resistencia", progreso: 55 },
  { nombre: "Valentina Cruz", objetivo: "Controlar dieta", progreso: 80 },
  { nombre: "Julián Pereyra", objetivo: "Tonificar abdomen", progreso: 40 },
];

const metasGenerales = [
  "Asistir al menos 3 veces por semana",
  "Realizar rutina completa al menos 4 días por semana",
  "Cumplir el plan alimenticio sugerido por el nutricionista",
  "Alcanzar al menos el 80% del objetivo físico mensual",
  "Mantener una rutina de descanso adecuada",
];

export default function CumplimientoMetas() {
  return (
    <Container className="mt-4 mb-5">
      <h3 className="mb-4">🎯 Cumplimiento de Metas</h3>
      {metas.map((m, index) => (
        <Card className="mb-3 p-3" key={index}>
          <Row>
            <Col md={4}>
              <strong>{m.nombre}</strong>
            </Col>
            <Col md={4}>
              <span>Objetivo: {m.objetivo}</span>
            </Col>
            <Col md={4}>
              <ProgressBar now={m.progreso} label={`${m.progreso}%`} />
            </Col>
          </Row>
        </Card>
      ))}

      <Card className="mt-5 p-3">
        <h5 className="mb-3">📌 Metas Generales a Cumplir</h5>
        <ListGroup>
          {metasGenerales.map((meta, index) => (
            <ListGroup.Item key={index}>{meta}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}
