import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { UsuariosContext } from "../context/UsuariosContext";

export default function LoginModal({ isOpen, onClose }) {
  const { usuarios, setUsuarios } = useContext(UsuariosContext);
  const [modo, setModo] = useState("login");
  const [form, setForm] = useState({
    usuario: "",
    email: "",
    contraseña: "",
    rol: "socio",
    nombre: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      modo === "register"
        ? "http://localhost:5000/api/usuarios/registrar"
        : "http://localhost:5000/api/usuarios/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (modo === "register") {
        setUsuarios([...usuarios, data.usuario]);
        alert("Registro exitoso. Ahora podés iniciar sesión.");
        setModo("login");
      } else {
        alert("Login exitoso");
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          {modo === "login" ? "Iniciar sesión" : "Registrarse"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {modo === "register" && (
            <>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="rol"
                  placeholder="Rol"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </>
          )}
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="usuario"
              placeholder="Usuario"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="w-100 rounded-pill"
          >
            {modo === "login" ? "Entrar" : "Registrarme"}
          </Button>
        </Form>
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link p-0"
            style={{ textDecoration: "underline" }}
            onClick={() => setModo(modo === "login" ? "register" : "login")}
          >
            {modo === "login"
              ? "¿No tenés una cuenta?"
              : "¿Ya tenés una cuenta?"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
