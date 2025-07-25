import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function AdminLogin() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const adminsValidos = [
    { usuario: "Rodolfo", contrasena: "rodo123" },
    { usuario: "Sofia", contrasena: "sofia123" },
    { usuario: "Celeste", contrasena: "cele123" },
    { usuario: "Ignacio", contrasena: "nacho123" },
    { usuario: "Mateo", contrasena: "mateo123" },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();

    const adminEncontrado = adminsValidos.find(
      (admin) => admin.usuario === usuario && admin.contrasena === contrasena
    );

    if (adminEncontrado) {
      localStorage.setItem("adminLogueado", "true");
      localStorage.setItem("adminNombre", adminEncontrado.usuario);
      navigate("/inicio");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };


  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>🏋️‍♂️ Panel Administrativo FitGym</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="👤 Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="admin-input"
        />
        <input
          type="password"
          placeholder="🔒 Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="admin-input"
        />

        <button type="submit" className="btn-gym">
          Ingresar al Panel
        </button>
      </form>
    </div>
  );
}
