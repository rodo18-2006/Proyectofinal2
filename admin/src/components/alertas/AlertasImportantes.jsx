import React from "react";
import { Card, Container, ListGroup, Alert, Badge } from "react-bootstrap";

export default function AlertasImportantes() {
  const expiraciones = [
    { nombre: "Juan Pérez", plan: "Mensual", vence: "2025-07-24", dias: 3 },
    { nombre: "María Gómez", plan: "Trimestral", vence: "2025-07-22", dias: 1 },
    { nombre: "Lucas Díaz", plan: "Mensual", vence: "2025-07-25", dias: 4 },
  ];

  const asistenciaBaja = [
    { nombre: "Laura Díaz", diasSinAsistir: 10 },
    { nombre: "Federico Gómez", diasSinAsistir: 14 },
  ];

  const cuotasVencidas = [
    { nombre: "Carlos Méndez", vencidaHace: 12 },
    { nombre: "Julia Vargas", vencidaHace: 22 },
  ];

  const alertasSistema = [
    "Se detectó un error en el registro de clases del 19/07",
    "2 mensajes en consultas no fueron enviados",
    "El espacio libre en disco del servidor es bajo",
  ];

  const recomendaciones = [
    "Verificar estado de membresías vencidas",
    "Responder consultas pendientes",
    "Revisar las clases del viernes",
  ];

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">🚨 Alertas Importantes</h2>

      {/* Miembros por expirar */}
      <Card className="mb-4 p-3">
        <h5>⏳ Miembros a punto de expirar</h5>
        <ListGroup>
          {expiraciones.map((item, idx) => (
            <ListGroup.Item key={idx}>
              {item.nombre} - Plan <strong>{item.plan}</strong> vence el{" "}
              <strong>{item.vence}</strong>{" "}
              <Badge bg="danger" className="ms-2">
                {item.dias} días restantes
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Baja asistencia */}
      <Card className="mb-4 p-3">
        <h5>📉 Miembros con baja asistencia</h5>
        <ListGroup>
          {asistenciaBaja.map((item, idx) => (
            <ListGroup.Item key={idx}>
              {item.nombre} - No asiste hace{" "}
              <strong>{item.diasSinAsistir} días</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Cuotas vencidas largas */}
      <Card className="mb-4 p-3">
        <h5>💰 Cuotas vencidas hace más de 10 días</h5>
        <ListGroup>
          {cuotasVencidas.map((item, idx) => (
            <ListGroup.Item key={idx}>
              {item.nombre} - Vencida hace{" "}
              <strong>{item.vencidaHace} días</strong>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Alertas del sistema */}
      <Card className="mb-4 p-3">
        <h5>🛠️ Alertas del sistema</h5>
        <ul>
          {alertasSistema.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </Card>

      {/* Recomendaciones */}
      <Card className="mb-5 p-3">
        <h5>📋 Acciones recomendadas</h5>
        <ul>
          {recomendaciones.map((item, idx) => (
            <li key={idx}>
              <input type="checkbox" className="me-2" /> {item}
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  );
}
