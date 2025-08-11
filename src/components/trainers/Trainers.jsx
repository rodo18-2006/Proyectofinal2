import { Container, Row, Col, Card } from "react-bootstrap";

const trainers = [
  {
    name: "Carlos Mendez",
    specialty: "Entrenador Personal",
    experience: "8 años de experiencia",
    image:
      "https://entrenadorpersonaloriol.com/wp-content/uploads/2023/03/oriol-foto-perfil-social-Editado.png",
  },
  {
    name: "Ana Rodriguez",
    specialty: "Instructora de Yoga",
    experience: "5 años de experiencia",
    image:
      "https://eshmunsportclinic.com/wp-content/uploads/2024/07/Diseno_sin_titulo__40_-removebg-preview-300x300.webp",
  },
  {
    name: "Miguel Torres",
    specialty: "Especialista en Funcional",
    experience: "6 años de experiencia",
    image:
      "https://assets.setmore.com/website/v2/images/industry-pages/personal-trainer/male-personal-trainer.png",
  },
  {
    name: "Laura Gomez",
    specialty: "Instructora de Spinning",
    experience: "4 años de experiencia",
    image:
      "https://almudenallacer.com/wp-content/uploads/2024/04/ALL_HQ_2-982x1024.png",
  },
];

export default function Trainers() {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-4 fw-bold mb-4 text-dark">Nuestros Entrenadores</h2>
            <p className="lead fs-4 text-muted">
              Profesionales certificados comprometidos con tu éxito
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {trainers.map((trainer, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <img
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    className="rounded-circle mb-3"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Title className="h4">{trainer.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-warning fw-semibold">
                    {trainer.specialty}
                  </Card.Subtitle>
                  <Card.Text className="text-muted">
                    {trainer.experience}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
