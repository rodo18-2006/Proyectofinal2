import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function AdminLogin() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  // Inputs para crear admin
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  // Lista de administradores locales (prueba)
  const adminsValidos = [
    { usuario: "Rodolfo", contrasena: "rodo123" },
    { usuario: "Sofia", contrasena: "sofia123" },
    { usuario: "Celeste", contrasena: "cele123" },
    { usuario: "Ignacio", contrasena: "nacho123" },
    { usuario: "Mateo", contrasena: "mateo123" },
  ];

  // Función para login
  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      // Intentar login en la base de datos
      const res = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password: contrasena }), // ⚡ cambiar aquí
      });


      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("adminLogueado", "true");
        localStorage.setItem("adminNombre", data.usuario);
        navigate("/inicio");
        return;
      }

      // Si no está en la BD, buscar en admins locales
      const adminLocal = adminsValidos.find(
        (admin) => admin.usuario === usuario && admin.contrasena === contrasena
      );

      if (adminLocal) {
        localStorage.setItem("adminLogueado", "true");
        localStorage.setItem("adminNombre", adminLocal.usuario);
        navigate("/inicio");
        return;
      }

      setError("Usuario o contraseña incorrectos");
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error en el login");
    }
  }

  // Función para crear nuevo admin
  async function crearNuevoAdmin() {
    try {
      const nuevoAdmin = {
        usuario,
        password: contrasena, // ⚡ aquí
        nombre: nombreCompleto,
        email,
      };

      const res = await fetch("http://localhost:5000/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoAdmin),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(JSON.stringify(data));

      alert("Administrador creado con éxito");
    } catch (error) {
      console.error("Error al crear admin:", error);
      alert("Error al crear administrador");
    }
  }

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>🏋️‍♂️ Panel Administrativo FitGym</h2>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="👤 Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="admin-input"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="🔒 Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="admin-input"
          autoComplete="current-password"
        />

        <button type="submit" className="btn-gym">
          Ingresar al Panel
        </button>
      </form>

      <hr />

   
    </div>
  );
}
