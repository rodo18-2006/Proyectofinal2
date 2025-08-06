"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const planDetails = {
  musculacion: {
    name: "Plan Solo Musculación",
    price: "$25000",
    description:
      "Acceso completo al área de musculación con equipos de última generación",
    features: [
      "Acceso ilimitado a sala de musculación",
      "Equipos de última generación",
      "Horarios flexibles de 6:00 a 23:00",
      "Asesoramiento básico incluido",
      "Vestuarios con duchas",
      "Estacionamiento gratuito",
    ],
  },
  clases: {
    name: "Plan Solo Clases",
    price: "$30000",
    description: "Acceso completo a todas nuestras clases grupales",
    features: [
      "Clases de spinning",
      "Yoga y pilates",
      "Zumba y aeróbicos",
      "Clases de funcional",
      "Aqua aeróbicos",
      "Reserva online de clases",
    ],
  },
  full: {
    name: "Plan Full",
    price: "$45000",
    description:
      "Acceso completo a todas las instalaciones y servicios premium",
    features: [
      "Acceso completo a musculación",
      "Todas las clases grupales",
      "Entrenamiento personalizado",
      "Consulta nutricional incluida",
      "Descuentos en productos",
      "Acceso a sauna y jacuzzi",
      "Toallas incluidas",
      "Bebidas deportivas gratis",
    ],
  },
};

export default function PlanDetailsPage() {
  const { planId } = useParams();
  const plan = planDetails[planId];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de envío de formulario
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!plan) {
    return (
      <div className="min-vh-100">
       
        <Container className="py-5">
          <Row className="text-center">
            <Col>
              <h1 className="display-4">Plan no encontrado</h1>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <Navbar />

      <section className="py-5">
        <Container>
          <Row className="g-5">
            {/* Detalles del plan */}
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">{plan.name}</h1>
              <div className="display-3 fw-bold text-warning mb-4">
                {plan.price}
                <small className="fs-4 text-muted">/mes</small>
              </div>
              <p className="lead mb-5">{plan.description}</p>

              <h3 className="h4 fw-semibold mb-4">¿Qué incluye?</h3>
              <ul className="list-unstyled">
                {plan.features.map((feature, index) => (
                  <li key={index} className="mb-2 d-flex align-items-center">
                    <span className="text-success me-3 fs-5">✓</span>
                    <span className="fs-5">{feature}</span>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Formulario de consulta */}
            <Col lg={6}>
              <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-4">
                  <Card.Title className="h3">Consultar Plan</Card.Title>
                  <Card.Text className="text-muted">
                    Completa el formulario y nos pondremos en contacto contigo
                  </Card.Text>
                </Card.Header>
                <Card.Body className="p-4">
                  {submitted ? (
                    <div className="text-center py-5">
                      <div className="text-success display-1 mb-3">✓</div>
                      <h3 className="h4 text-success mb-3">
                        ¡Consulta Enviada!
                      </h3>
                      <p className="text-muted">
                        Hemos recibido tu consulta sobre el {plan.name}. Te
                        hemos enviado un email de confirmación y nos pondremos
                        en contacto contigo pronto.
                      </p>
                    </div>
                  ) : (
                    <Form onSubmit={handleSubmit}>
                      <Row className="g-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Mensaje (opcional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Cuéntanos sobre tus objetivos o cualquier pregunta que tengas..."
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="warning"
                        size="lg"
                        className="w-100 fw-semibold"
                        disabled={loading}
                      >
                        {loading ? "Enviando consulta..." : "Enviar Consulta"}
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
}
