import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Planes.css";


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
      // Llamar a tu backend para crear preferencia
     const response = await fetch(
       "http://localhost:5000/api/pagados/crear-preferencia",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(preferenceData),
       }
     );

      const data = await response.json();

      if (data.init_point) {
        // Abrir MercadoPago
        window.open(data.init_point, "_blank");

        // Opcional: guardar el pago (si tienes info usuario, adaptá)
        await fetch("http://localhost:5000/api/pagos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: "id-o-nombre-de-usuario", // debes tener esto disponible
            nombrePlan: plan.nombre,
            monto: plan.precio,
          }),
        });
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
            <Card.Text className="tex">$45000</Card.Text>
            <Button
              variant="primary"
              disabled={loading}
              onClick={() =>
                handlePagar({ nombre: "Plan Full", precio: 35000 })
              }
            >
              {loading ? "Cargando..." : "Pagar"}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Planesmp;