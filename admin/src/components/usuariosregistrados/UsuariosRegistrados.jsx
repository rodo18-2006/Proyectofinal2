import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UsuariosRegistrados.css"; // Vamos a usar algo de CSS personalizado

function UsuariosRegistrados() {
  const navigate = useNavigate();
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if (usuarios.length === 0) {
  const usuariosEjemplo = [
    {
      usuario: "juanperez",
      email: "juan@gmail.com",
      rol: "Socio",
      nombreCompleto: "Juan Pérez",
    },
    {
      usuario: "anaromero",
      email: "romero@fitlife.com",
      rol: "Instructora",
      nombreCompleto: "Ana Romero",
    },
    {
      usuario: "carlos_admin",
      email: "admin@admin.com",
      rol: "Administrador",
      nombreCompleto: "Carlos López",
    },
    {
      usuario: "mariagonzalez",
      email: "maria@gmail.com",
      rol: "Socia",
      nombreCompleto: "María González",
    },
    {
      usuario: "luisfernandez",
      email: "fernandez@fitlife.com",
      rol: "Instructor",
      nombreCompleto: "Luis Fernández",
    },
    {
      usuario: "joseramallo",
      email: "jose@gym.com",
      rol: "Socio",
      nombreCompleto: "José Ramallo",
    },
    {
      usuario: "paulalopez",
      email: "paula@fitlife.com",
      rol: "Recepcionista",
      nombreCompleto: "Paula López",
    },
    {
      usuario: "federicoruiz",
      email: "federico@fitlife.com",
      rol: "Instructor",
      nombreCompleto: "Federico Ruiz",
    },
    {
      usuario: "danielarodriguez",
      email: "daniela@fitlife.com",
      rol: "Instructora",
      nombreCompleto: "Daniela Rodríguez",
    },
    {
      usuario: "martinmorales",
      email: "martin@fitlife.com",
      rol: "Socio",
      nombreCompleto: "Martín Morales",
    },
    {
      usuario: "sofiacastro",
      email: "sofia@fitlife.com",
      rol: "Socia",
      nombreCompleto: "Sofía Castro",
    },
    {
      usuario: "agustinmendez",
      email: "agustin@fitlife.com",
      rol: "Instructor",
      nombreCompleto: "Agustín Méndez",
    },
    {
      usuario: "carolinamolina",
      email: "carolina@fitlife.com",
      rol: "Recepcionista",
      nombreCompleto: "Carolina Molina",
    },
    {
      usuario: "matiasdiaz",
      email: "matias@fitlife.com",
      rol: "Instructor",
      nombreCompleto: "Matías Díaz",
    },
    {
      usuario: "valentinatorres",
      email: "valentina@fitlife.com",
      rol: "Instructora",
      nombreCompleto: "Valentina Torres",
    },
    {
      usuario: "lucianoruiz",
      email: "luciano@fitlife.com",
      rol: "Socio",
      nombreCompleto: "Luciano Ruiz",
    },
    {
      usuario: "andreaklein",
      email: "andrea@fitlife.com",
      rol: "Socia",
      nombreCompleto: "Andrea Klein",
    },
    {
      usuario: "sebastianvera",
      email: "sebastian@fitlife.com",
      rol: "Instructor",
      nombreCompleto: "Sebastián Vera",
    },
  ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosEjemplo));
  }

  const getAvatarByRol = (rol) => {
    switch (rol.toLowerCase()) {
      case "socio":
      case "socia":
        return "https://cdn-icons-png.flaticon.com/512/847/847969.png";
      case "instructor":
      case "instructora":
        return "https://cdn-icons-png.flaticon.com/512/194/194935.png";
      case "administrador":
        return "https://cdn-icons-png.flaticon.com/512/2922/2922510.png";
      default:
        return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }
  };

  const getBadgeVariant = (rol) => {
    switch (rol.toLowerCase()) {
      case "administrador":
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
            <Card className={`user-card shadow border-0`}>
              <Card.Body className="d-flex align-items-center">
                <img
                  src={getAvatarByRol(usuario.rol)}
                  alt="avatar"
                  className="avatar-img me-3"
                />
                <div>
                  <h5 className="mb-1">{usuario.nombreCompleto}</h5>
                  <p className="mb-1 text-muted">@{usuario.usuario}</p>
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

export default UsuariosRegistrados;
