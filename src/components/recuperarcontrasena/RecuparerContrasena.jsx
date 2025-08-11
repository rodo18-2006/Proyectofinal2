import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Recuperar.css";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaContraseña || nuevaContraseña.length < 6) {
      Swal.fire(
        "Error",
        "La contraseña debe tener al menos 6 caracteres",
        "error"
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/usuarios/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, nuevaContraseña }),
        }
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.mensaje || "Error al cambiar contraseña");
      Swal.fire("Éxito", "Contraseña cambiada correctamente", "success");
      navigate("/login");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <p style={{ textAlign: "center", marginTop: "3rem" }}>
        Token inválido o no proporcionado.
      </p>
    );
  }

  return (
    <div className="reset-password-container">
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nuevaContraseña">Nueva contraseña</label>
        <input
          id="nuevaContraseña"
          type="password"
          value={nuevaContraseña}
          onChange={(e) => setNuevaContraseña(e.target.value)}
          placeholder="Escribe tu nueva contraseña"
          minLength={6}
          required
          autoFocus
        />
        <button type="submit" disabled={loading}>
          {loading ? "Cambiando..." : "Cambiar contraseña"}
        </button>
      </form>
    </div>
  );
}
