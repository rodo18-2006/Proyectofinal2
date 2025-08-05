import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import UsuariosRegistrados from "./UsuariosRegistrados";

export default function PanelAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);

  // Cargar usuarios desde backend al montar el componente
  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch(console.error);
  }, []);

  // Agregar nuevo usuario a la lista actual
  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios((prev) => [...prev, nuevoUsuario]);
  };

  return (
    <div>
      <h1>Panel de Administración</h1>
      <button onClick={() => setModalAbierto(true)}>
        Registrar Nuevo Usuario
      </button>

      <LoginModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onNuevoRegistro={agregarUsuario}
      />

      <UsuariosRegistrados usuarios={usuarios} />
    </div>
  );
}
  