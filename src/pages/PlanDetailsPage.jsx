/* "use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";


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

   try {
     const response = await fetch("http://localhost:5000/api/contact", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         name: formData.name,
         email: formData.email,
         phone: formData.phone,
         message: `Consulta por el plan: ${plan.name}. Mensaje: ${formData.message}`,
       }),
     });

     if (response.ok) {
       setSubmitted(true);
     } else {
       const data = await response.json();
       console.error("Error al enviar:", data);
       alert("Hubo un error al enviar tu consulta.");
     }
   } catch (error) {
     console.error("Error de red:", error);
     alert("No se pudo conectar al servidor.");
   } finally {
     setLoading(false);
   }
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
      <section className="py-5">
        <Container>
          <Row className="g-5">
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
                              isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
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
                              isInvalid={!formData.name.trim()}
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
                          isInvalid={!formData.name.trim()}
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
                          isInvalid={!formData.name.trim()}
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
 */


"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

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

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido";
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido";
    // mensaje es opcional, no valido
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Consulta por el plan: ${plan.name}. Mensaje: ${formData.message}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        console.error("Error al enviar:", data);
        alert("Hubo un error al enviar tu consulta.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar al servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
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
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <section className="py-5">
        <Container>
          <Row className="g-5">
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
                          <Form.Group controlId="formName">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              isInvalid={!!errors.name}
                              placeholder="Tu nombre"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formPhone">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleInputChange}
                              isInvalid={!!errors.phone}
                              placeholder="Tu teléfono"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.phone}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          isInvalid={!!errors.email}
                          placeholder="tu@email.com"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formMessage" className="mb-4">
                        <Form.Label>Mensaje</Form.Label>
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
