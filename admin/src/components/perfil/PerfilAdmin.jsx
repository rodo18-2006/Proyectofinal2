import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Image,
  ListGroup,
} from "react-bootstrap";

const AdminNotifications = () => {
  const notifications = [
    { id: 1, message: "3 pagos atrasados", type: "warning" },
    { id: 2, message: "5 nuevos inscritos esta semana", type: "info" },
    { id: 3, message: "2 membresías por vencer en 3 días", type: "danger" },
  ];

  const getColor = (type) => {
    switch (type) {
      case "danger":
        return "#dc3545";
      case "warning":
        return "#ffc107";
      case "info":
        return "#0d6efd";
      default:
        return "#6c757d";
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header>🔔 Notificaciones Importantes</Card.Header>
      <ListGroup variant="flush">
        {notifications.map((note) => (
          <ListGroup.Item
            key={note.id}
            style={{ color: getColor(note.type), fontWeight: "600" }}
          >
            {note.message}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default function PerfilAdmin() {
  const admin = {
    nombre: "Carlos López",
    usuario: "admincarlos",
    email: "admin@gym.com",
    telefono: "381-123-4567",
    direccion: "Av. Siempre Viva 123, Tucumán",
    rol: "Administrador",
    fechaCreacion: "2024-03-15",
    ultimaSesion: "2025-07-20 10:45",
    sesionesIniciadas: 150,

  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">👤 Perfil del Administrador</h2>
      <Card className="p-4">
        <Row className="align-items-center">
         
          <Col md={9}>
            <Row>
              <Col md={6}>
                <p>
                  <strong>Nombre completo:</strong> {admin.nombre}
                </p>
                <p>
                  <strong>Usuario:</strong> {admin.usuario}
                </p>
                <p>
                  <strong>Email:</strong> {admin.email}
                </p>
                <p>
                  <strong>Teléfono:</strong> {admin.telefono}
                </p>
              </Col>
              <Col md={6}>
                <p>
                  <strong>Dirección:</strong> {admin.direccion}
                </p>
                <p>
                  <strong>Rol:</strong> {admin.rol}
                </p>
                <p>
                  <strong>Fecha creación:</strong> {admin.fechaCreacion}
                </p>
                <p>
                  <strong>Última sesión:</strong> {admin.ultimaSesion}
                </p>
                <p>
                  <strong>Sesiones iniciadas:</strong> {admin.sesionesIniciadas}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="warning" className="me-3">
            Editar Perfil
          </Button>
          <Button variant="secondary" className="me-3">
            Cambiar Contraseña
          </Button>
          <Button variant="danger">Cerrar Sesión</Button>
        </div>

        {/* Aquí se muestra el bloque de notificaciones */}
        <AdminNotifications />
      </Card>
    </Container>
  );
}
