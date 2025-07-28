import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const teamMembers = [
  {
    name: "Rodolfo Juarez",
    role: "Full Stack Developer",
    image: "./img/rodo.jpg",
    description: "Especialista en React y Node.js",
  },
  {
    name: "Mateo Manzares",
    role: "Frontend Developer",
    image: "./img/mateo.jpg",
    description: "Experto en UI/UX y React",
  },
  {
    name: "Celeste Galindo",
    role: "Backend Developer",
    image: "./img/cele.jpg",
    description: "Especialista en APIs y bases de datos",
  },
  {
    name: "Sofia Caldez",
    role: "QA Tester",
    image: "./img/sofia.jpg",
    description: "Garantiza la calidad del software",
  },
  {
    name: "Ignacio Teseira",
    role: "QA Tester",
    image: "./img/nacho.jpg",
    description: "Garantiza la calidad del software",
  },
];

export default function AboutPage() {
  return (
    <div className="min-vh-100">
      <Navbar />

      {/*  <section className="py-5">
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

          <Row className="g-4 mb-5 flex-nowrap overflow-auto">
            {teamMembers.map((member, index) => (
              <Col key={index} style={{ minWidth: "250px" }}>
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
      </section> */}
      <section className="py-5">
        <Container>
          {/* Título principal */}
          <Row className="text-center mb-5">
            <Col>
              <h1 className="display-3 fw-bold mb-4">Acerca de nuestro Gimnasio</h1>
              <p className="lead fs-4 text-muted mb-5">
                Somos más que un lugar para entrenar: somos una comunidad
                dedicada al bienestar físico y mental.
              </p>
            </Col>
          </Row>

          {/* Imagen ilustrativa amplia */}
          <Row className="mb-5">
            <Col>
              <img
                src="https://www.derecho.uba.ar/comunicaciones/content/noticias/tres-nuevas-actividades-en-el-gimnasio-de-deportes-de-nuestra-facultad.4599.jpg"
                alt="Personas entrenando"
                className="img-fluid rounded shadow w-100"
              />
            </Col>
          </Row>

          {/* Objetivo + imagen al costado */}
          <Row className="align-items-center mb-5">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">Nuestro Objetivo</h2>
              <p className="lead text-muted">
                Ayudar a cada persona a alcanzar su mejor versión, a través de
                entrenamientos efectivos, asesoramiento personalizado y un
                ambiente que motive al cambio positivo.
              </p>
            </Col>
            <Col md={6}>
              <img
                src="https://www.derecho.uba.ar/comunicaciones/content/noticias/tres-nuevas-actividades-en-el-gimnasio-de-deportes-de-nuestra-facultad.4595.jpg"
                alt="Entrenador ayudando a un socio"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>

          {/* Misión del gimnasio */}
          <Row className="align-items-center mb-5 flex-md-row-reverse">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">Nuestra Misión</h2>
              <p className="lead text-muted">
                Promover un estilo de vida saludable para todas las edades,
                mediante el uso de tecnología, profesionales calificados y
                espacios que inspiran constancia y compromiso.
              </p>
            </Col>
            <Col md={6}>
              <img
                src="https://www.derecho.uba.ar/comunicaciones/content/noticias/entrenamiento-funcional.11790.jpg"
                alt="Clase grupal en acción"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>

          {/* Valores */}
          <Row className="text-center mb-5">
            <Col>
              <h3 className="fw-bold mb-3">Nuestros Valores</h3>
              <p className="text-muted">
                Pasión por el bienestar, cercanía con la comunidad, innovación
                constante y compromiso con cada persona que nos elige.
              </p>
            </Col>
          </Row>

          {/* Instalaciones */}
          <Row className="text-center mb-4">
            <Col>
              <h3 className="fw-bold mb-4">Nuestras Instalaciones</h3>
            </Col>
          </Row>
          <Row className="g-3 mb-5">
            <Col md={4}>
              <img
                src="https://www.derecho.uba.ar/comunicaciones/content/noticias/tres-nuevas-actividades-en-el-gimnasio-de-deportes-de-nuestra-facultad.4598.jpg"
                alt="Sala de musculación"
                className="img-fluid rounded shadow"
                style={{ height: "250px", width: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={4}>
              <img
                src="https://www.derecho.uba.ar/comunicaciones/content/noticias/tres-nuevas-actividades-en-el-gimnasio-de-deportes-de-nuestra-facultad.4596.jpg"
                alt="Clases grupales"
                className="img-fluid rounded shadow"
                style={{ height: "250px", width: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={4}>
              <img
                src="https://kickfitbarcelona.es/uploads/images/md/2023/283/brooklyn-fitboxing-melilla.webp"
                alt="Área de cardio"
                className="img-fluid rounded shadow"
                style={{ height: "250px", width: "100%", objectFit: "cover" }}  
              />
            </Col>
          </Row>

          {/* Equipo de desarrollo */}
          <Row className="text-center mb-4 mt-5">
            <Col>
              <h2 className="display-5 fw-bold">Equipo de Desarrollo</h2>
              <p className="lead text-muted">
                Esta plataforma fue diseñada por un equipo apasionado por la
                tecnología.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5 flex-nowrap overflow-auto">
            {teamMembers.map((member, index) => (
              <Col key={index} style={{ minWidth: "250px" }}>
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
        </Container>
      </section>

      <Footer />
    </div>
  );
}
