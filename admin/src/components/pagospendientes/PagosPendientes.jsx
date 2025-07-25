import React from "react";
import { Container, Table, ListGroup } from "react-bootstrap";

const calcularDiasRestantes = (fechaLimite) => {
  const hoy = new Date();
  const limite = new Date(fechaLimite);
  const diferencia = limite - hoy;
  return Math.max(Math.ceil(diferencia / (1000 * 60 * 60 * 24)), 0);
};

export default function CuotasPendientes() {
  const pendientes = [
    {
      id: 1,
      usuario: "Camila Díaz",
      ultimoMesPago: "Mayo 2025",
      montoAdeudado: 1500,
      fechaLimite: "2025-07-25",
      detalle: "Clase de Yoga",
      entrenador: "Ana Rodríguez",
    },
    {
      id: 2,
      usuario: "Javier Ortega",
      ultimoMesPago: "Abril 2025",
      montoAdeudado: 3000,
      fechaLimite: "2025-07-25",
      detalle: "Funcional + Nutrición",
      entrenador: "Miguel Torres",
    },
    {
      id: 3,
      usuario: "Lucía Fernández",
      ultimoMesPago: "Mayo 2025",
      montoAdeudado: 1500,
      fechaLimite: "2025-07-25",
      detalle: "Spinning",
      entrenador: "Laura Gómez",
    },
    {
      id: 4,
      usuario: "Pedro Álvarez",
      ultimoMesPago: "Marzo 2025",
      montoAdeudado: 4500,
      fechaLimite: "2025-07-25",
      detalle: "Musculación + Nutrición + Spinning",
      entrenador: "Carlos Méndez",
    },
    {
      id: 5,
      usuario: "Valentina Ríos",
      ultimoMesPago: "Mayo 2025",
      montoAdeudado: 1500,
      fechaLimite: "2025-07-25",
      detalle: "Clase de Yoga",
      entrenador: "Ana Rodríguez",
    },
  ];

  return (
    <Container className="mt-4 mb-5 pb-5">
      <h2 className="mb-4 text-center">⏳ Cuotas Pendientes</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Último Mes Pagado</th>
            <th>Monto Adeudado (ARS)</th>
            <th>Días Restantes para Pagar</th>
          </tr>
        </thead>
        <tbody>
          {pendientes.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.id}</td>
              <td>{persona.usuario}</td>
              <td>{persona.ultimoMesPago}</td>
              <td>${persona.montoAdeudado.toLocaleString("es-AR")}</td>
              <td>{calcularDiasRestantes(persona.fechaLimite)} días</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h5 className="mt-5">📋 Detalles de las deudas:</h5>
      <ListGroup className="mt-3">
        {pendientes.map((p) => (
          <ListGroup.Item key={p.id}>
            <strong>{p.usuario}</strong> debe <em>{p.detalle}</em> con el
            entrenador <strong>{p.entrenador}</strong>.
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
