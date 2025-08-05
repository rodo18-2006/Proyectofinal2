import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Planes.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Planesmp() {
  const [loading, setLoading] = useState(false);

  const handlePagar = async (plan) => {
    setLoading(true);

    const preferenceData = {
      items: [
        {
          title: plan.nombre,
          quantity: 1,
          unit_price: plan.precio,
        },
      ],
      back_urls: {
        success: "https://www.success.com",
        failure: "https://www.failure.com",
        pending: "https://www.pending.com",
      },
      auto_return: "approved",
    };

    try {
      const response = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer APP_USR-4656146995432608-072414-59aced3c614ef1e3905b21e4b2419e3b-2575799057",
          },

          body: JSON.stringify(preferenceData),
        }
      );

      const data = await response.json();

      if (data.init_point) {
        window.open(data.init_point, "_blank"); // Abre checkout en pestaña nueva
      } else {
        alert("Error al crear la preferencia de pago");
        console.error(data);
      }
    } catch (error) {
      console.error(error);
      alert("Error en la conexión con Mercado Pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="planes-container">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/img/musculacion.jpg" />
          <Card.Body>
            <Card.Title>Plan Solo Musculación</Card.Title>
            <Card.Text>
              Acceso a sala de musculación
              <br />
              Equipos de última generación
              <br />
              Horarios flexibles
              <br />
              Asesoramiento básico
            </Card.Text>
            <Card.Text className="tex">$25000</Card.Text>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() =>
                handlePagar({ nombre: "Plan Solo Musculación", precio: 25000 })
              }
            >
              {loading ? "Redirigiendo..." : "Pagar"}
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/img/clases.jpg" />
          <Card.Body>
            <Card.Title>Plan Solo Clases</Card.Title>
            <Card.Text>
              Clases de spinning
              <br />
              Yoga y pilates
              <br />
              Zumba y aeróbicos
              <br />
              Clases de funcional
            </Card.Text>
            <Card.Text className="tex">$30000</Card.Text>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() =>
                handlePagar({ nombre: "Plan Solo Clases", precio: 30000 })
              }
            >
              {loading ? "Redirigiendo..." : "Pagar"}
            </Button>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="/img/planfull.jpg" />
          <Card.Body>
            <Card.Title>Plan Full</Card.Title>
            <Card.Text>
              Acceso a musculación
              <br />
              Todas las clases grupales
              <br />
              Entrenamiento personalizado
              <br />


              

              Nutricionista incluido
              <br />
            </Card.Text>
            <Card.Text className="tex">$35000</Card.Text>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() =>
                handlePagar({ nombre: "Plan Full", precio: 35000 })
              }
            >
              {loading ? "Redirigiendo..." : "Pagar"}
            </Button>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  );
}


export default Planesmp;


