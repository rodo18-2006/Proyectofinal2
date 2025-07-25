"use client";

import { useState } from "react";
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@fitgym.com" && password === "admin123") {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("isLoggedIn", "true");
        onLogin(true); // Avisás al padre que es admin
      } else if (email === "user@fitgym.com" && password === "user123") {
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("isLoggedIn", "true");
        onLogin(false); // Avisás al padre que es usuario normal
      } else {
        setError("Credenciales incorrectas");
      }
      setLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Iniciar Sesión</h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            Ingresa tus credenciales para acceder
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="demo-credentials">
            <p className="demo-title">Credenciales de prueba:</p>
            <p className="demo-item">Admin: admin@fitgym.com / admin123</p>
            <p className="demo-item">Usuario: user@fitgym.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
