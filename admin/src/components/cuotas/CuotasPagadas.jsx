import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

export default function CuotasPagadas() {
  const [cuotas, setCuotas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/pagados")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar cuotas");
        return res.json();
      })
      .then((data) => setCuotas(data))
      .catch((err) => console.error(err));
  }, []);

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
          {cuotas.map((cuota, index) => (
            <tr key={cuota._id || index}>
              <td>{index + 1}</td>
              <td>{cuota.usuario}</td>
              <td>{new Date(cuota.fechaPago).toLocaleDateString("es-AR")}</td>
              <td>${cuota.monto.toLocaleString("es-AR")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}