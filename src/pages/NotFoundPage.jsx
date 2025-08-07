"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-vh-100 bg-black text-white d-flex align-items-center justify-content-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            {/* Ícono o GIF opcional */}
            <div className="mb-4">
              <img
                src="https://media.tenor.com/WJrxtr--PCUAAAAj/workout-gym.gif" // Podés reemplazar por un GIF con fondo transparente
                alt="Gym fail"
                style={{ width: "250px", borderRadius: "12px" }}
              />
            </div>

            <h1 className="display-1 fw-bold text-danger mb-3">404</h1>
            <h2 className="fw-bold mb-3 text-warning">
              ¡Oops! Te saliste de la rutina
            </h2>

            <p className="fs-5 text-light mb-4">
              Esta página se excedio con el peso y colapsó. <br />
              Quizás hiciste demasiadas repeticiones de "clicks" 😅
            </p>

            

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button
                as={Link}
                to="/"
                variant="warning"
                size="lg"
                className="px-4 py-2 fw-semibold"
              >
                🏠 Volver al Gimnasio
              </Button>

              <Button
                variant="outline-light"
                size="lg"
                className="px-4 py-2 fw-semibold"
                onClick={() => window.history.back()}
              >
                ← Ir Atrás
              </Button>
            </div>

            <div className="mt-5">
              <p className="text-muted">
                
                <Link
                  to="/contact"
                  className="text-warning text-decoration-none"
                >
                  Contactanos por cualquier consulta
                </Link>{" "}
                
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
