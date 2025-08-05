import React, { useContext } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UsuariosContext } from "../context/UsuariosContext";

export default function UsuariosRegistrados() {
  const { usuarios, loading } = useContext(UsuariosContext);
  const navigate = useNavigate();

  const getAvatarByRol = (rol) => {
    switch (rol.toLowerCase()) {
      case "socio":
      case "socia":
        return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
      case "instructor":
      case "instructora":
        return "https://cdn-icons-png.flaticon.com/512/194/194935.png";
      case "administrador":
      case "admin":
        return "https://cdn-icons-png.flaticon.com/512/2922/2922510.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }
  };

  const getBadgeVariant = (rol) => {
    switch (rol.toLowerCase()) {
      case "administrador":
      case "admin":
        return "danger";
      case "instructor":
      case "instructora":
        return "info";
      case "socio":
      case "socia":
        return "success";
      default:
        return "secondary";
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (!usuarios.length) return <p>No hay usuarios registrados.</p>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🎫 Carnets de Usuarios Registrados</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p>
          <strong>Usuarios activos:</strong> {usuarios.length}
        </p>
        <Button variant="secondary" onClick={() => navigate("/inicio")}>
          ⬅️ Volver al inicio
        </Button>
      </div>

      <Row>
        {usuarios.map((usuario, index) => (
          <Col key={index} xs={12} md={6} lg={4} className="mb-4">
            <Card className="user-card shadow border-0">
              <Card.Body className="d-flex align-items-center">
                <img
                  src={getAvatarByRol(usuario.rol)}
                  alt="avatar"
                  className="avatar-img me-3"
                  style={{ width: 50, height: 50, objectFit: "cover" }}
                />
                <div>
                  <h5 className="mb-1">
                    {usuario.nombre || usuario.nombreCompleto}
                  </h5>
                  <p className="mb-1 text-muted">
                    @
                    {usuario.usuario ||
                      (usuario.email ? usuario.email.split("@")[0] : "")}
                  </p>
                  <p className="mb-1">{usuario.email}</p>
                  <Badge bg={getBadgeVariant(usuario.rol)}>{usuario.rol}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
