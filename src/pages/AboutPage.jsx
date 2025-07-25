import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const teamMembers = [
  {
    name: "Juan Pérez",
    role: "Full Stack Developer",
    image: "https://via.placeholder.com/200x200/007bff/ffffff?text=Juan",
    description: "Especialista en React y Node.js",
  },
  {
    name: "María González",
    role: "Frontend Developer",
    image: "https://via.placeholder.com/200x200/28a745/ffffff?text=María",
    description: "Experta en UI/UX y React",
  },
  {
    name: "Carlos Rodríguez",
    role: "Backend Developer",
    image: "https://via.placeholder.com/200x200/ffc107/ffffff?text=Carlos",
    description: "Especialista en APIs y bases de datos",
  },
  {
    name: "Ana Martínez",
    role: "QA Tester",
    image: "https://via.placeholder.com/200x200/dc3545/ffffff?text=Ana",
    description: "Garantiza la calidad del software",
  },
];

export default function AboutPage() {
  return (
    <div className="min-vh-100">
      <Navbar />

      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="display-3 fw-bold mb-4">Acerca de Nosotros</h1>
              <p className="lead fs-4 text-muted mb-5">
                "Somos un equipo apasionado de desarrolladores comprometidos con
                crear soluciones tecnológicas innovadoras que transformen la
                experiencia fitness y ayuden a las personas a alcanzar sus
                objetivos de salud."
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            {teamMembers.map((member, index) => (
              <Col key={index} md={6} lg={3}>
                <Card className="text-center h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="rounded-circle mb-3"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Title className="h4">{member.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-warning fw-semibold">
                      {member.role}
                    </Card.Subtitle>
                    <Card.Text className="text-muted small">
                      {member.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="text-center">
            <Col>
              <h2 className="display-5 fw-bold mb-4">Nuestra Misión</h2>
              <p className="lead text-muted">
                Desarrollamos tecnología que conecta a las personas con sus
                objetivos de fitness, creando experiencias digitales intuitivas
                y eficientes que faciliten la gestión de gimnasios y mejoren la
                vida de los usuarios. Creemos en el poder de la tecnología para
                hacer que el fitness sea más accesible y motivador para todos.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
