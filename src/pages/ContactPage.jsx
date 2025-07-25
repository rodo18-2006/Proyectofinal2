"use client";

import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", 
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "El asunto es requerido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulación de envío de formulario
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

 
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div className="min-vh-100">
      <Navbar />

      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h1 className="display-3 fw-bold mb-4">Contactanos</h1>
              <p className="lead fs-4 text-muted">
                ¿Tienes alguna pregunta? Nos encantaría escucharte. Envíanos un
                mensaje y te responderemos lo antes posible.
              </p>
            </Col>
          </Row>

          <Row className="g-5">
            {/* Información de contacto */}
            <Col lg={6}>
              <h2 className="h3 fw-semibold mb-4">Información de Contacto</h2>

              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  <span className="fs-4 me-3">📍</span>
                  <div>
                    <h3 className="h5 fw-semibold">Dirección</h3>
                    <p className="text-muted">
                      Juan Pablo II, T4103 San Miguel de Tucumán, Tucumán
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <span className="fs-4 me-3">📞</span>
                  <div>
                    <h3 className="h5 fw-semibold">Teléfono</h3>
                    <p className="text-muted">+54 11 1234-5678</p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <span className="fs-4 me-3">✉️</span>
                  <div>
                    <h3 className="h5 fw-semibold">Email</h3>
                    <p className="text-muted">info@fitgym.com</p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <span className="fs-4 me-3">🕒</span>
                  <div>
                    <h3 className="h5 fw-semibold">Horarios de Atención</h3>
                    <div className="text-muted">
                      <p className="mb-1">Lunes - Viernes: 9:00 - 18:00</p>
                      <p className="mb-1">Sábados: 9:00 - 14:00</p>
                      <p className="mb-0">Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Formulario de contacto */}
            <Col lg={6}>
              <Card className="border-0 shadow">
                <Card.Header className="bg-white border-0 py-4">
                  <Card.Title className="h3 mb-2">
                    Envíanos un Mensaje
                  </Card.Title>
                  <Card.Text className="text-muted">
                    Completa el formulario y nos pondremos en contacto contigo
                  </Card.Text>
                </Card.Header>
                <Card.Body className="p-4">
                  {submitted ? (
                    <div className="text-center py-5">
                      <div className="text-success display-1 mb-3">✓</div>
                      <h3 className="h4 text-success mb-3">
                        ¡Mensaje Enviado!
                      </h3>
                      <p className="text-muted">
                        Gracias por contactarnos. Hemos recibido tu mensaje y te
                        responderemos dentro de las próximas 24 horas.
                      </p>
                    </div>
                  ) : (
                    <Form onSubmit={handleSubmit}>
                      <Row className="g-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Nombre completo *</Form.Label>
                            <Form.Control
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Teléfono *</Form.Label>
                            <Form.Control
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Asunto *</Form.Label>
                        <Form.Control
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          isInvalid={!!errors.subject}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Mensaje *</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          isInvalid={!!errors.message}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="warning"
                        size="lg"
                        className="w-100 fw-semibold"
                        disabled={loading}
                      >
                        {loading ? "Enviando mensaje..." : "Enviar Mensaje"}
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
