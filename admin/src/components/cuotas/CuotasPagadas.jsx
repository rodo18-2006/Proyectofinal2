import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";

export default function CuotasPagadas() {
  // Datos estáticos provisionales
  const cuotasEjemplo = [
    { id: 1, usuario: "Juan Pérez", fechaPago: "2025-06-01", monto: 25000 },
    { id: 2, usuario: "Ana Romero", fechaPago: "2025-06-05", monto: 30000 },
    { id: 3, usuario: "Carlos López", fechaPago: "2025-06-03", monto: 25000 },
    { id: 4, usuario: "María González", fechaPago: "2025-06-07", monto: 20000 },
    { id: 5, usuario: "Luis López", fechaPago: "2025-06-10", monto: 3000 },
    { id: 6, usuario: "José Ramallo", fechaPago: "2025-06-12", monto: 25000 },
    { id: 7, usuario: "Maximo Montero", fechaPago: "2025-06-15", monto: 25000 },
    { id: 8, usuario: "Sofía Pérez", fechaPago: "2025-06-18", monto: 2000 },
    { id: 9, usuario: "Mateo Gómez", fechaPago: "2025-06-20", monto: 3000 },
    { id: 10, usuario: "Celeste López", fechaPago: "2025-06-22", monto: 25000 },
    { id: 11, usuario: "Carlos Méndez", fechaPago: "2025-06-24", monto: 25000 },
    { id: 12, usuario: "Ana Rodríguez", fechaPago: "2025-06-26", monto: 30000 },
    { id: 13, usuario: "Miguel Torres", fechaPago: "2025-06-28", monto: 30000 },
  ];

  const [cuotas, setCuotas] = useState(cuotasEjemplo);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">💰 Cuotas Pagadas</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Fecha de Pago</th>
            <th>Monto (ARS)</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map((cuota) => (
            <tr key={cuota.id}>
              <td>{cuota.id}</td>
              <td>{cuota.usuario}</td>
              <td>{cuota.fechaPago}</td>
              <td>${cuota.monto.toLocaleString("es-AR")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
