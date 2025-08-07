
/* import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";

import { Container, Accordion, Button, Form } from "react-bootstrap";

export default function Consultas() {
<<<<<<< HEAD

  const mensajesEjemplo = [
    {
      id: 1,
      usuario: "María González",
      asunto: "Consulta sobre horarios",
      mensaje:
        "Hola, quisiera saber si hay clases de spinning los fines de semana.",
      fecha: "2025-07-18",
      respondido: false,
    },
    {
      id: 2,
      usuario: "Juan Pérez",
      asunto: "Problema con mi inscripción",
      mensaje: "No puedo inscribirme a la clase de yoga, me da error.",
      fecha: "2025-07-19",
      respondido: false,
    },
    {
      id: 3,
      usuario: "Sofía Rodríguez",
      asunto: "Pago pendiente",
      mensaje: "¿Puedo pagar la mensualidad en efectivo en el gimnasio?",
      fecha: "2025-07-19",
      respondido: false,
    },
    {
      id: 4,
      usuario: "Carlos Martínez",
      asunto: "Consulta sobre entrenadores",
      mensaje:
        "¿Hay disponibilidad para entrenamientos personales los sábados?",
      fecha: "2025-07-20",
      respondido: false,
    },
    {
      id: 5,
      usuario: "Lucía Fernández",
      asunto: "Duda sobre horarios",
      mensaje: "¿Las clases de yoga se pueden tomar en la mañana?",
      fecha: "2025-07-20",
      respondido: false,
    },
    {
      id: 6,
      usuario: "Martín Gómez",
      asunto: "Solicitud de cambio de clase",
      mensaje:
        "Quisiera cambiar mi clase de musculación al horario de la tarde.",
      fecha: "2025-07-21",
      respondido: false,
    },
    {
      id: 7,
      usuario: "Ana Sánchez",
      asunto: "Consulta sobre pagos",
      mensaje:
        "¿Puedo pagar la membresía mensual a través de transferencia bancaria?",
      fecha: "2025-07-21",
      respondido: false,
    },
    {
      id: 8,
      usuario: "Jorge López",
      asunto: "Consulta general",
      mensaje: "¿Hay clases de pilates disponibles para principiantes?",
      fecha: "2025-07-22",
      respondido: false,
    },
    {
      id: 9,
      usuario: "Jose Ramallo",
      asunto: "Consulta general",
      mensaje: "¿De cuanto tiempo son las clases mayormente?",
      fecha: "2025-07-22",
      respondido: false,
    },
    {
      id: 8,
      usuario: "Alejandra Veliz",
      asunto: "Consulta general",
      mensaje: "¿Podemos tener las clases todos los dias de la semana o solo van alternando?",
      fecha: "2025-07-22",
      respondido: false,
    },
  ];


  const [mensajes, setMensajes] = useState(mensajesEjemplo);
  const [respuestas, setRespuestas] = useState({}); 

  const [mensajes, setMensajes] = useState([]);
  const [respuestas, setRespuestas] = useState({});

  const [expanded, setExpanded] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const url = "http://localhost:5000/api/contact"; // URL fija, sin variable de entorno
    console.log("Fetch URL:", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);

  const handleRespuestaChange = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const enviarRespuesta = async (id) => {
    if (!respuestas[id] || respuestas[id].trim() === "") {
      alert("Por favor escribe una respuesta antes de enviar.");
      return;
    }


   
    setMensajes((prev) => prev.filter((m) => m.id !== id));

  

    alert(`Respuesta enviada:\n\n${respuestas[id]}`);

    try {
      await fetch(`${API_URL}/api/contact/${id}/respond`, {
        // <-- aquí también
        method: "PATCH",
      });

      setMensajes((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error al marcar como respondido:", err);
    }

>>>>>>> a42c2b7a37e1dd14c69bd0b61cc040046a4a6d11
    setRespuestas((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📩 Consultas sin responder</h2>
      {mensajes.length === 0 ? (
        <p className="text-center">No hay mensajes sin responder.</p>
      ) : (
        <Accordion className="container-con-mensaje" activeKey={expanded}>
          {mensajes.map(({ _id, name, subject, message, createdAt }) => (
            <Accordion.Item eventKey={_id} key={_id}>
              <Accordion.Header
                onClick={() => setExpanded(expanded === _id ? null : _id)}
              >
                <strong>{name}</strong> - {subject}{" "}
                <small className="text-muted ms-2">
                  {new Date(createdAt).toLocaleDateString()}
                </small>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <em>{message}</em>
                </p>
                <Form.Group controlId={`respuesta-${_id}`} className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={respuestas[_id] || ""}
                    onChange={(e) => handleRespuestaChange(_id, e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => enviarRespuesta(_id)}>
                  Enviar respuesta
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}
 */


/* import React, { useState, useEffect } from "react";
import { Container, Accordion, Button, Form } from "react-bootstrap";

export default function Consultas() {
  const [mensajes, setMensajes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [expanded, setExpanded] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);

  const handleRespuestaChange = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const enviarRespuesta = async (id) => {
    if (!respuestas[id] || respuestas[id].trim() === "") {
      alert("Por favor escribe una respuesta antes de enviar.");
      return;
    }

    alert(`Respuesta enviada:\n\n${respuestas[id]}`);

    try {
  
      await fetch(`${API_URL}/api/contact/${id}/respond`, {
        method: "PATCH",
      });

      setMensajes((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error al marcar como respondido:", err);
    }

    setRespuestas((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📩 Consultas sin responder</h2>
      {mensajes.length === 0 ? (
        <p className="text-center">No hay mensajes sin responder.</p>
      ) : (
        <Accordion className="container-con-mensaje" activeKey={expanded}>
          {mensajes.map(({ _id, name, subject, message, date }) => (
            <Accordion.Item eventKey={_id} key={_id}>
              <Accordion.Header
                onClick={() => setExpanded(expanded === _id ? null : _id)}
              >
                <strong>{name}</strong> - {subject}{" "}
                <small className="text-muted ms-2">
                  {new Date(date).toLocaleDateString()}
                </small>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <em>{message}</em>
                </p>
                <Form.Group controlId={`respuesta-${_id}`} className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={respuestas[_id] || ""}
                    onChange={(e) => handleRespuestaChange(_id, e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => enviarRespuesta(_id)}>
                  Enviar respuesta
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}
 */

/* import React, { useState, useEffect } from "react";
import { Container, Accordion, Button, Form } from "react-bootstrap";

export default function Consultas() {
  const [mensajes, setMensajes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [expanded, setExpanded] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/contact`)
      .then((res) => res.json())
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);

  const handleRespuestaChange = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const enviarRespuesta = async (id) => {
    if (!respuestas[id] || respuestas[id].trim() === "") {
      alert("Por favor escribe una respuesta antes de enviar.");
      return;
    }

    alert(`Respuesta enviada:\n\n${respuestas[id]}`);

    try {
      // Marcar mensaje como respondido
      await fetch(`${API_URL}/api/contact/${id}/respond`, {
        method: "PATCH",
      });

      setMensajes((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error al marcar como respondido:", err);
    }

    setRespuestas((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📩 Consultas sin responder</h2>
      {mensajes.length === 0 ? (
        <p className="text-center">No hay mensajes sin responder.</p>
      ) : (
        <Accordion className="container-con-mensaje" activeKey={expanded}>
          {mensajes.map(({ _id, name, subject, message, date }) => (
            <Accordion.Item eventKey={_id} key={_id}>
              <Accordion.Header
                onClick={() => setExpanded(expanded === _id ? null : _id)}
              >
                <strong>{name}</strong> - {subject}{" "}
                <small className="text-muted ms-2">
                  {new Date(date).toLocaleDateString()}
                </small>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <em>{message}</em>
                </p>
                <Form.Group controlId={`respuesta-${_id}`} className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={respuestas[_id] || ""}
                    onChange={(e) => handleRespuestaChange(_id, e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => enviarRespuesta(_id)}>
                  Enviar respuesta
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}
 */

/* import React, { useState, useEffect } from "react";
import { Container, Accordion, Button, Form } from "react-bootstrap";

export default function Consultas() {
  const [mensajes, setMensajes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [expanded, setExpanded] = useState(null);

const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const url = "http://localhost:5000/api/contact"; 
    console.log("Fetch URL:", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al obtener mensajes:", err));
  }, []);



  const handleRespuestaChange = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const enviarRespuesta = async (id) => {
    if (!respuestas[id] || respuestas[id].trim() === "") {
      alert("Por favor escribe una respuesta antes de enviar.");
      return;
    }

    alert(`Respuesta enviada:\n\n${respuestas[id]}`);

    try {
      await fetch(`${API_URL}/api/contact/${id}/respond`, {
        
        method: "PATCH",
      });

      setMensajes((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error al marcar como respondido:", err);
    }

    setRespuestas((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📩 Consultas sin responder</h2>
      {mensajes.length === 0 ? (
        <p className="text-center">No hay mensajes sin responder.</p>
      ) : (
        <Accordion className="container-con-mensaje" activeKey={expanded}>
          {mensajes.map(({ _id, name, subject, message, createdAt }) => (
            <Accordion.Item eventKey={_id} key={_id}>
              <Accordion.Header
                onClick={() => setExpanded(expanded === _id ? null : _id)}
              >
                <strong>{name}</strong> - {subject}{" "}
                <small className="text-muted ms-2">
                  {new Date(createdAt).toLocaleDateString()}
                </small>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <em>{message}</em>
                </p>
                <Form.Group controlId={`respuesta-${_id}`} className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={respuestas[_id] || ""}
                    onChange={(e) => handleRespuestaChange(_id, e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => enviarRespuesta(_id)}>
                  Enviar respuesta
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}
 */


import React, { useState, useEffect } from "react";
import { Container, Accordion, Button, Form } from "react-bootstrap";

export default function Consultas() {
  const [mensajes, setMensajes] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [expanded, setExpanded] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  const url = "http://localhost:5000/api/contact/contact";
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      // Filtrar mensajes no respondidos
      const noRespondidos = data.filter((m) => !m.respondido);
      setMensajes(noRespondidos);
    })
    .catch((err) => console.error("Error al obtener mensajes:", err));
}, []);


  const handleRespuestaChange = (id, texto) => {
    setRespuestas((prev) => ({ ...prev, [id]: texto }));
  };

  const enviarRespuesta = async (id) => {
    if (!respuestas[id] || respuestas[id].trim() === "") {
      alert("Por favor escribe una respuesta antes de enviar.");
      return;
    }

    alert(`Respuesta enviada:\n\n${respuestas[id]}`);

    try {
      await fetch(`http://localhost:5000/api/contact/contact/${id}/respond`, {
        method: "PATCH",
      });

      setMensajes((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error al marcar como respondido:", err);
    }

    setRespuestas((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">📩 Consultas sin responder</h2>
      {mensajes.length === 0 ? (
        <p className="text-center">No hay mensajes sin responder.</p>
      ) : (
        <Accordion className="container-con-mensaje" activeKey={expanded}>
          {mensajes.map(({ _id, name, subject, message, createdAt }) => (
            <Accordion.Item eventKey={_id} key={_id}>
              <Accordion.Header
                onClick={() => setExpanded(expanded === _id ? null : _id)}
              >
                <strong>{name}</strong> - {subject}{" "}
                <small className="text-muted ms-2">
                  {new Date(createdAt).toLocaleDateString()}
                </small>
              </Accordion.Header>
              <Accordion.Body>
                <p>
                  <em>{message}</em>
                </p>
                <Form.Group controlId={`respuesta-${_id}`} className="mb-3">
                  <Form.Label>Tu respuesta:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={respuestas[_id] || ""}
                    onChange={(e) => handleRespuestaChange(_id, e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => enviarRespuesta(_id)}>
                  Enviar respuesta
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}
