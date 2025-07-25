"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-vh-100 bg-dark text-white d-flex align-items-center">
      <Container>
        <Row className="text-center">
          <Col>
            <div className="mb-5">
              <h1 className="display-1 fw-bold text-warning mb-4">404</h1>
              <h2 className="display-4 fw-bold mb-4">Página No Encontrada</h2>
              <p className="lead fs-4 text-light mb-5">
                Lo sentimos, la página que estás buscando no existe o ha sido
                movida. Pero no te preocupes, puedes volver al inicio y
                continuar explorando.
              </p>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Button
                as={Link}
                to="/"
                variant="warning"
                size="lg"
                className="px-5 py-3 fs-5"
              >
                🏠 Volver al Inicio
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className="px-5 py-3 fs-5"
                onClick={() => window.history.back()}
              >
                ← Página Anterior
              </Button>
            </div>

            <div className="mt-5">
              <p className="text-muted">
                ¿Necesitas ayuda?{" "}
                <Link
                  to="/contact"
                  className="text-warning text-decoration-none"
                >
                  Contactanos
                </Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
