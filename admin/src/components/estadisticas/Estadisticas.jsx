import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export default function Estadisticas() {
  // Estado con datos
  const [stats, setStats] = useState({
    asistenciaMensual: 75,
    usuariosActivos: 120,
    usuariosInactivos: 30,
    pagosRecibidos: 95,
    pagosPendientes: 10,
    nuevosUsuarios: 20,
    clasesPopulares: [
      { clase: "Musculación", inscripciones: 45 },
      { clase: "Yoga", inscripciones: 30 },
      { clase: "Spinning", inscripciones: 25 },
    ],
  });

  const [clasesProgramadas, setClasesProgramadas] = useState([
    { clase: "Musculación", dia: "Lunes" },
    { clase: "Yoga", dia: "Lunes" },
    { clase: "Spinning", dia: "Martes" },
    { clase: "Funcional", dia: "Martes" },
  ]);

  const [nuevaClase, setNuevaClase] = useState({ clase: "", dia: "" });

  // Agrupar clases por día
  const clasesPorDia = {};
  clasesProgramadas.forEach(({ dia }) => {
    clasesPorDia[dia] = (clasesPorDia[dia] || 0) + 1;
  });

  const handleChangeStat = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handlePopularChange = (index, field, value) => {
    const nuevas = [...stats.clasesPopulares];
    nuevas[index][field] = field === "inscripciones" ? parseInt(value) : value;
    setStats({ ...stats, clasesPopulares: nuevas });
  };

  const handleNuevaClase = () => {
    if (nuevaClase.clase && nuevaClase.dia) {
      setClasesProgramadas([...clasesProgramadas, nuevaClase]);
      setNuevaClase({ clase: "", dia: "" });
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        📊 Estadísticas del Gimnasio (Editable)
      </h2>

      {/* Estadísticas principales */}
      <Row className="mb-3">
        {["asistenciaMensual", "usuariosActivos", "usuariosInactivos"].map(
          (key, i) => (
            <Col key={i} md={4}>
              <Card className="text-center">
                <Card.Body>
                  <Card.Title>
                    {key === "asistenciaMensual"
                      ? "Asistencia Mensual"
                      : key === "usuariosActivos"
                      ? "Usuarios Activos"
                      : "Usuarios Inactivos"}
                  </Card.Title>
                  <Form.Control
                    type="number"
                    name={key}
                    value={stats[key]}
                    onChange={handleChangeStat}
                    className="text-center fw-bold fs-4"
                  />
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>

      {/* Clases Populares */}
      <h4>Clases más populares</h4>
      {stats.clasesPopulares.map((clase, i) => (
        <Row key={i} className="mb-2">
          <Col md={6}>
            <Form.Control
              type="text"
              value={clase.clase}
              onChange={(e) => handlePopularChange(i, "clase", e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              type="number"
              value={clase.inscripciones}
              onChange={(e) =>
                handlePopularChange(i, "inscripciones", e.target.value)
              }
            />
          </Col>
        </Row>
      ))}

      {/* Pagos y nuevos usuarios */}
      <Row className="mt-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pagos Recibidos</Card.Title>
              <Form.Control
                type="number"
                name="pagosRecibidos"
                value={stats.pagosRecibidos}
                onChange={handleChangeStat}
                className="text-center fw-bold fs-4"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pagos Pendientes</Card.Title>
              <Form.Control
                type="number"
                name="pagosPendientes"
                value={stats.pagosPendientes}
                onChange={handleChangeStat}
                className="text-center fw-bold fs-4"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Nuevos Usuarios</Card.Title>
              <Form.Control
                type="number"
                name="nuevosUsuarios"
                value={stats.nuevosUsuarios}
                onChange={handleChangeStat}
                className="text-center fw-bold fs-4"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Clases por día */}
      <h4 className="mt-5 text-center">📅 Clases por Día</h4>
      <Row className="mt-3">
        {Object.entries(clasesPorDia).map(([dia, cantidad], index) => (
          <Col key={index} md={3} className="mb-3">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{dia}</Card.Title>
                <Card.Text style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                  {cantidad} {cantidad === 1 ? "clase" : "clases"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Agregar nueva clase */}
      <h5 className="mt-4">➕ Agregar nueva clase programada</h5>
      <Row className="mb-3">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Nombre de la clase"
            value={nuevaClase.clase}
            onChange={(e) =>
              setNuevaClase({ ...nuevaClase, clase: e.target.value })
            }
          />
        </Col>
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Día"
            value={nuevaClase.dia}
            onChange={(e) =>
              setNuevaClase({ ...nuevaClase, dia: e.target.value })
            }
          />
        </Col>
        <Col md={2}>
          <Button
            onClick={handleNuevaClase}
            variant="success"
            className="w-100"
          >
            Agregar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
