"use client";

import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import Swal from 'sweetalert2';
import "./LoginModal.css";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [modalView, setModalView] = useState("login");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [plan, setPlan] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    switchView("login");
    onClose();
  };

  const switchView = (view) => {
    setNombre(""); setApellido(""); setTelefono("");
    setDni(""); setPlan(""); setEmail("");
    setPassword(""); setPassword2(""); setAceptaTerminos(false);
    setErrors({});
    setModalView(view);
  };

  const validateForm = () => {
    const newErrors = {};
if (!nombre.trim()) {
  newErrors.nombre = "El nombre es requerido";
} else if (nombre.length < 2) {
  newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
} else if (nombre.length > 30) {
  newErrors.nombre = "El nombre no puede superar los 30 caracteres";
}
if (!apellido.trim()) {
  newErrors.apellido = "El apellido es requerido";
} else if (apellido.length < 2) {
  newErrors.apellido = "El apellido debe tener al menos 2 caracteres";
} else if (apellido.length > 30) {
  newErrors.apellido = "El apellido no puede superar los 30 caracteres";
}
if (!telefono.trim()) {
  newErrors.telefono = "El teléfono es requerido";
} else if (telefono.length < 8) {
  newErrors.telefono = "El teléfono debe tener al menos 8 dígitos";
} else if (telefono.length > 15) {
  newErrors.telefono = "El teléfono no puede tener más de 15 dígitos";
}
if (!dni.trim()) {
  newErrors.dni = "El DNI es requerido";
} else if (dni.length < 7) {
  newErrors.dni = "El DNI debe tener al menos 7 dígitos";
} else if (dni.length > 10) {
  newErrors.dni = "El DNI no puede tener más de 10 dígitos";
}
if (!email.trim()) {
  newErrors.email = "El email es requerido";
} else if (!/\S+@\S+\.\S+/.test(email)) {
  newErrors.email = "El email no es válido";
}
if (!password.trim()) {
  newErrors.password = "La contraseña es requerida";
} else if (password.length < 6) {
  newErrors.password = "Debe tener al menos 6 caracteres";
} else if (password.length > 20) {
  newErrors.password = "La contraseña no puede superar los 20 caracteres";
}
if (!password2.trim()) {
  newErrors.password2 = "Repetí tu contraseña";
} else if (password2 !== password) {
  newErrors.password2 = "Las contraseñas no coinciden";
}
    if (!plan) newErrors.plan = "Debes elegir un plan";
    if (!aceptaTerminos) newErrors.aceptaTerminos = "Debes aceptar los términos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "El email es requerido";
    if (!password.trim()) newErrors.password = "La contraseña es requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRecover = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "El email no es válido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nombre, apellido, telefono, dni, email, password, plan })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Error al registrar usuario");
      Swal.fire({ icon: "success", title: "Registro exitoso", text: "Ya podés iniciar sesión" });
      switchView("login");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error al iniciar sesión");
      Swal.fire({ icon: "success", title: "Inicio de sesión exitoso" });
      sessionStorage.setItem("token", data.token);
      onLogin(data.user?.rol === "admin");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRecover = async (e) => {
    e.preventDefault();
    if (!validateRecover()) return;
    setLoading(true);
    try {
      await fetch("http://localhost:3001/api/users/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      Swal.fire({ icon: "success", title: "Enlace enviado", text: "Revisá tu email para recuperar contraseña" });
      switchView("login");
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo enviar el enlace" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            { modalView === "login" ? "Iniciar sesión" : modalView === "register" ? "Registrarse" : "Recuperar contraseña" }
          </h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            { modalView === "login" && "Bienvenido a FitGym" }
            { modalView === "register" && "Crea tu cuenta en FitGym" }
            { modalView === "recover" && "Recupera tu contraseña" }
          </p>

          {modalView === "login" && (
            <form onSubmit={handleSubmitLogin}>
              {errors.email && <small className="error">{errors.email}</small>}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className={`form-input ${errors.email ? "input-error" : ""}`}
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              {errors.password && <small className="error">{errors.password}</small>}
              <div className="form-group">
                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                <div className="password-input">
                  <input type={showPassword ? "text" : "password"}
                    className={`form-input ${errors.password ? "input-error" : ""}`}
                    value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </button>
              <button type="button" className="link form-login-link" onClick={() => switchView("recover")}>
                ¿Olvidaste tu contraseña?
              </button>
              <button type="button" className="link form-login-link" onClick={() => switchView("register")}>
                ¿No tienes cuenta? Regístrate
              </button>
            </form>
          )}

          {modalView === "register" && (
            <form onSubmit={handleRegister}>
              {/* Nombre */}
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text"
                className={`form-input ${errors.nombre ? "input-error" : ""}`}
                value={nombre} onChange={e => setNombre(e.target.value)} />
                {errors.nombre && <small className="error">{errors.nombre}</small>}
              </div>
              {/* Apellido */}
              <div className="form-group">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input type="text" className={`form-input ${errors.apellido ? "input-error" : ""}`}
                  value={apellido} onChange={e => setApellido(e.target.value)} />
                {errors.apellido && <small className="error">{errors.apellido}</small>}
              </div>
              {/* Teléfono */}
              <div className="form-group">
                <label htmlFor="telefeno" className="form-label">Teléfono</label>
                <input type="number"
                className={`form-input ${errors.telefono ? "input-error" : ""}`}
                value={telefono} onChange={e => setTelefono(e.target.value)} />
                {errors.telefono && <small className="error">{errors.telefono}</small>}
              </div>
              {/* DNI */}
              <div className="form-group">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input type="number" 
                className={`form-input ${errors.dni ? "input-error" : ""}`}
                 value={dni} onChange={e => setDni(e.target.value)} />
                {errors.dni && <small className="error">{errors.dni}</small>}
              </div>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className={`form-input ${errors.email ? "input-error" : ""}`}
                  value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <small className="error">{errors.email}</small>}
              </div>
              {/* Plan */}
              <div className="form-group">
                <label htmlFor="plan" className="form-label">Plan</label>
                <Form.Select className={errors.plan ? "input-error" : ""} value={plan}
                  onChange={e => setPlan(e.target.value)}>
                  <option value="" disabled>Selecciona un plan</option>
                  <option value="basico">Musculación</option>
                  <option value="intermedio">Clases</option>
                  <option value="premium">Full</option>
                  <option value="No quiero ningun plan">No quiero plan</option>
                </Form.Select>
                {errors.plan && <small className="error">{errors.plan}</small>}
              </div>
              {/* Contraseña */}
              <div className="form-group">
                <label htmlFor="contasena" className="form-label">Contraseña</label>
                <div className="password-input">
                  <input type={showPassword ? "text" : "password"}  
                    className={`form-input ${errors.password ? "input-error" : ""}`}
                    value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && <small className="error">{errors.password}</small>}
              </div>
              {/* Repetir Contraseña */}
                 <div className="form-group">
                 <label htmlFor="repetir contrasena" className="form-label">Repetir Contraseña</label>
                 <div className="password-input">
                 <input
                  type={showPassword2 ? "text" : "password"} 
                  className={`form-input ${errors.password2 ? "input-error" : ""}`}
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                 />
                   <button
                   type="button"
                   className="password-toggle"
                   onClick={() => setShowPassword2(!showPassword2)}
                  >
                 {showPassword2 ? "👁️" : "👁️‍🗨️"}
                 </button>
                 </div>
                 {errors.password2 && <small className="error">{errors.password2}</small>}
                 </div>
              {/* Términos */}
              <div className="form-check">
                <label className="checkbox-label">
                  <input type="checkbox" checked={aceptaTerminos}
                    onChange={e => setAceptaTerminos(e.target.checked)} />
                  Acepto los <Link to="/terminos-y-condiciones" className="link">
                    términos y condiciones</Link>
                </label>
                {errors.aceptaTerminos && <small className="error">{errors.aceptaTerminos}</small>}
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </button>
              <button type="button" className="link form-login-link"
                onClick={() => switchView("login")}>
                ¿Ya tienes cuenta? Iniciar sesión
              </button>
            </form>
          )}

          {modalView === "recover" && (
            <form onSubmit={handleRecover}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email para recuperación</label>
                <input type="email"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <small className="error">{errors.email}</small>}
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar enlace de recuperación"}
              </button>
              <button type="button" className="link form-login-link"
                onClick={() => switchView("login")}>
                Volver al login
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
