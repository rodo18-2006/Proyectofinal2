import { Container, Row, Col, Card } from "react-bootstrap";

const Testimonials = ({ data }) => {
  return (
    <section className="py-5">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-4 fw-bold mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="lead fs-4 text-muted">
              Testimonios reales de personas que han transformado su vida con
              nosotros
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {data.map((testimonial) => (
            <Col key={testimonial._id} md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-warning fs-5">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <Card.Text className="fst-italic mb-3">
                    "{testimonial.comment}"
                  </Card.Text>
                  <Card.Text className="fw-bold text-end mt-auto">
                    - {testimonial.name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
