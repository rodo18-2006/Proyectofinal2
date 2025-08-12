"use client";

import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import "./LoginModal.css";
import { UsuariosContext } from "../context/UsuariosContext"; 

export default function LoginModal({ isOpen, onClose }) {
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

  const { login } = useContext(UsuariosContext);

  const handleClose = () => {
    switchView("login");
    onClose();
  };

  const switchView = (view) => {
    setNombre("");
    setApellido("");
    setTelefono("");
    setDni("");
    setPlan("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setAceptaTerminos(false);
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
    if (!aceptaTerminos)
      newErrors.aceptaTerminos = "Debes aceptar los términos";
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
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "El email no es válido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/usuarios/registro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            apellido,
            telefono,
            dni,
            email,
            contraseña: password,
            plan,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || "Error en el registro");

      await Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: data.mensaje || "¡Bienvenido!",
      });
      switchView("login");
    } catch (error) {
      await Swal.fire({ icon: "error", title: "Error", text: error.message });
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || "Error al iniciar sesión");

      Swal.fire({ icon: "success", title: "Inicio de sesión exitoso" });

      localStorage.setItem("token", data.token);

      login(data.usuario);

      onClose(); 
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
      await fetch("http://localhost:5000/api/usuarios/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      Swal.fire({
        icon: "success",
        title: "Enlace enviado",
        text: "Revisá tu email para recuperar contraseña",
      });
      switchView("login");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar el enlace",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {modalView === "login"
              ? "Iniciar sesión"
              : modalView === "register"
              ? "Registrarse"
              : "Recuperar contraseña"}
          </h2>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            {modalView === "login" && "Bienvenido a FitGym"}
            {modalView === "register" && "Crea tu cuenta en FitGym"}
            {modalView === "recover" && "Recupera tu contraseña"}
          </p>

          {modalView === "login" && (
            <form onSubmit={handleSubmitLogin}>
              {errors.email && <small className="error">{errors.email}</small>}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.password && (
                <small className="error">{errors.password}</small>
              )}
              <div className="form-group">
                <label htmlFor="contrasena" className="form-label">
                  Contraseña
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-input ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? "Iniciando..." : "Iniciar sesión"}
              </button>
              <button
                type="button"
                className="link form-login-link"
                onClick={() => switchView("recover")}
              >
                ¿Olvidaste tu contraseña?
              </button>
              <button
                type="button"
                className="link form-login-link"
                onClick={() => switchView("register")}
              >
                ¿No tienes cuenta? Regístrate
              </button>
            </form>
          )}

          {modalView === "register" && (
            <form onSubmit={handleRegister}>
              
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.nombre ? "input-error" : ""}`}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errors.nombre && (
                  <small className="error">{errors.nombre}</small>
                )}
              </div>
             
              <div className="form-group">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className={`form-input ${
                    errors.apellido ? "input-error" : ""
                  }`}
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                {errors.apellido && (
                  <small className="error">{errors.apellido}</small>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="telefeno" className="form-label">
                  Teléfono
                </label>
                <input
                  type="number"
                  className={`form-input ${
                    errors.telefono ? "input-error" : ""
                  }`}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                {errors.telefono && (
                  <small className="error">{errors.telefono}</small>
                )}
              </div>
            
              <div className="form-group">
                <label htmlFor="dni" className="form-label">
                  DNI
                </label>
                <input
                  type="number"
                  className={`form-input ${errors.dni ? "input-error" : ""}`}
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                />
                {errors.dni && <small className="error">{errors.dni}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <small className="error">{errors.email}</small>
                )}
              </div>
           
              <div className="form-group">
                <label htmlFor="plan" className="form-label">
                  Plan
                </label>
                <Form.Select
                  className={errors.plan ? "input-error" : ""}
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <option value="" disabled>
                    Selecciona un plan
                  </option>
                  <option value="basico">Musculación</option>
                  <option value="intermedio">Clases</option>
                  <option value="premium">Full</option>
                  <option value="No quiero ningun plan">No quiero plan</option>
                </Form.Select>
                {errors.plan && <small className="error">{errors.plan}</small>}
              </div>
             
              <div className="form-group">
                <label htmlFor="contasena" className="form-label">
                  Contraseña
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-input ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <small className="error">{errors.password}</small>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="repetir contrasena" className="form-label">
                  Repetir Contraseña
                </label>
                <div className="password-input">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    className={`form-input ${
                      errors.password2 ? "input-error" : ""
                    }`}
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
                {errors.password2 && (
                  <small className="error">{errors.password2}</small>
                )}
              </div>
              
              <div className="form-check">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                  />
                  Acepto los{" "}
                  <Link to="/terminos-y-condiciones" className="link">
                    términos y condiciones
                  </Link>
                </label>
                {errors.aceptaTerminos && (
                  <small className="error">{errors.aceptaTerminos}</small>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
              <button
                type="button"
                className="link form-login-link"
                onClick={() => switchView("login")}
              >
                ¿Ya tienes cuenta? Iniciar sesión
              </button>
            </form>
          )}

          {modalView === "recover" && (
            <form onSubmit={handleRecover}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email para recuperación
                </label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <small className="error">{errors.email}</small>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar enlace de recuperación"}
              </button>
              <button
                type="button"
                className="link form-login-link"
                onClick={() => switchView("login")}
              >
                Volver al login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* import React, { useContext, useState } from "react";
 import { Modal, Button, Form } from "react-bootstrap";
 import { useNavigate } from "react-router-dom";
 import { UsuariosContext } from "../context/UsuariosContext";

 export default function LoginModal({ isOpen, onClose, onLogin }) {
   const { usuarios, setUsuarios } = useContext(UsuariosContext);
   const [modo, setModo] = useState("login");
   const [form, setForm] = useState({
     usuario: "",
     email: "",
     contraseña: "",
     rol: "usuario",
     nombre: "",
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
     setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();

     const endpoint =
       modo === "register"
         ? "http://localhost:5000/api/usuarios/registrar"
         : "http://localhost:5000/api/usuarios/login";

     const payload =
       modo === "register"
         ? {
             nombre: form.nombre,
             email: form.email,
             contraseña: form.contraseña,
             rol: form.rol,
           }
         : {
             email: form.email,
             contraseña: form.contraseña,
           };

     try {
       const res = await fetch(endpoint, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(payload),
       });

       const data = await res.json();

       if (!res.ok) throw new Error(data.mensaje || "Error en el proceso");

       const usuario = data.usuario;

       // Guardar sesión en localStorage (importante guardar email también)
       localStorage.setItem("isLoggedIn", "true");
       localStorage.setItem(
         "isAdmin",
         usuario.rol === "admin" ? "true" : "false"
       );
       localStorage.setItem("nombreUsuario", usuario.nombre || usuario.email);
       localStorage.setItem("emailUsuario", usuario.email);
       localStorage.setItem("rol", usuario.rol);
       localStorage.setItem("usuarioId", usuario.id || usuario._id);

       setUsuarios([...usuarios, usuario]);
       onLogin(usuario.rol === "admin");

       navigate("/cuenta");
       onClose();
     } catch (err) {
       console.error(err);
       alert("Error: " + err.message);
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
                   value={form.rol}
                   required
                   disabled
                 />
                 <small className="text-muted">
                   El rol se asigna automáticamente al registrarse
                 </small>
               </Form.Group>
             </>
           )}
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
 */

/*  "use client";

 import { Link } from "react-router-dom";
 import Form from "react-bootstrap/Form";
 import { useState } from "react";
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
   const [error, setError] = useState("");
   const [errors, setErrors] = useState({});
   const [successMsg, setSuccessMsg] = useState("");

   const handleClose = () => {
     switchView("login");
     onClose();
   };

   const switchView = (view) => {
     setNombre("");
     setApellido("");
     setTelefono("");
     setDni("");
     setPlan("");
     setEmail("");
     setPassword("");
     setPassword2("");
     setAceptaTerminos(false);
     setError("");
     setErrors({});
     setSuccessMsg("");
     setModalView(view);
   };

   const validateForm = () => {
     const newErrors = {};

     if (!nombre.trim()) newErrors.nombre = "El nombre es requerido";
     if (!apellido.trim()) newErrors.apellido = "El apellido es requerido";
     if (!telefono.trim()) newErrors.telefono = "El teléfono es requerido";
     if (!dni.trim()) newErrors.dni = "El DNI es requerido";
     if (!email.trim()) newErrors.email = "El email es requerido";
     else if (!/\S+@\S+\.\S+/.test(email))
       newErrors.email = "El email no es válido";

     if (!password.trim()) newErrors.password = "La contraseña es requerida";
     else if (password.length < 6)
       newErrors.password = "Debe tener al menos 6 caracteres";

     if (password2 !== password)
       newErrors.password2 = "Las contraseñas no coinciden";
     if (!plan) newErrors.plan = "Debes elegir un plan";
     if (!aceptaTerminos)
       newErrors.aceptaTerminos = "Debes aceptar los términos";

     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

   const handleRegister = async (e) => {
     e.preventDefault();
     if (!validateForm()) return;

     setLoading(true);
     setError("");
     setSuccessMsg("");

     try {
       const res = await fetch("http://localhost:5000/api/usuarios/registrar", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           nombre,
           email,
           contraseña: password,
         }),
       });

       const data = await res.json();

       if (!res.ok) {
         setError(data.mensaje || "Error en el registro");
       } else {
         setSuccessMsg("Registro exitoso! Ya podés iniciar sesión.");
         setTimeout(() => {
           switchView("login");
         }, 2000);
       }
     } catch (err) {
       setError("Error de conexión con el servidor");
     } finally {
       setLoading(false);
     }
   };

   const handleSubmitLogin = async (e) => {
     e.preventDefault();
     setLoading(true);
     setError("");
     setSuccessMsg("");

     try {
       const res = await fetch("http://localhost:4000/usuarios/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, contraseña: password }),
       });

       const data = await res.json();

       if (!res.ok) {
         setError(data.mensaje || "Credenciales incorrectas");
       } else {
         setSuccessMsg("Login exitoso!");
         onLogin(data.usuario);
       
       }
     } catch (err) {
       setError("Error de conexión con el servidor");
     } finally {
       setLoading(false);
     }
   };

   const handleRecover = async (e) => {
     e.preventDefault();
     setLoading(true);
     setError("");
     setSuccessMsg("");

     if (!email.trim()) {
       setError("Por favor, ingresa tu email para recuperar la contraseña");
       setLoading(false);
       return;
     }

     try {
       const res = await fetch("http://localhost:4000/usuarios/recuperar", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email }),
       });

       const data = await res.json();

       if (!res.ok) {
         setError(data.mensaje || "Error al recuperar la contraseña");
       } else {
         setSuccessMsg("Revisa tu correo, te enviamos una nueva contraseña.");
         setTimeout(() => {
           switchView("login");
         }, 3000);
       }
     } catch (err) {
       setError("Error de conexión con el servidor");
     } finally {
       setLoading(false);
     }
   };

   if (!isOpen) return null;

   return (
     <div
       className="modal-overlay"
       onClick={(e) => {
         if (e.target === e.currentTarget) handleClose();
       }}
     >
       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
         <div className="modal-header">
           <h2 className="modal-title">
             {modalView === "login"
               ? "Iniciar sesión"
               : modalView === "register"
               ? "Registrarse"
               : "Recuperar contraseña"}
           </h2>
           <button className="close-btn" onClick={handleClose}>
             ×
           </button>
         </div>

         <div className="modal-body">
           <p className="modal-subtitle">
             {modalView === "login" && "Bienvenido a FitGym"}
             {modalView === "register" && "Crea tu cuenta en FitGym"}
             {modalView === "recover" && "Recupera tu contraseña"}
           </p>

           {error && <p className="form-error">{error}</p>}
           {successMsg && <p className="form-success">{successMsg}</p>}

           {modalView === "login" && (
             <form onSubmit={handleSubmitLogin}>
               <div className="form-group">
                 <label className="form-label">Email</label>
                 <input
                   type="email"
                   className={`form-input ${errors.email ? "input-error" : ""}`}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
               </div>

               <div className="form-group">
                 <label className="form-label">Contraseña</label>
                 <div className="password-input">
                   <input
                     type={showPassword ? "text" : "password"}
                     className={`form-input ${
                       errors.password ? "input-error" : ""
                     }`}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
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

               <p className="form-login-link">
                 ¿No tienes cuenta?{" "}
                 <button
                   type="button"
                   onClick={() => switchView("register")}
                   className="link"
                 >
                   Regístrate aquí
                 </button>
               </p>

               <p className="form-login-link">
                 <button
                   type="button"
                   onClick={() => switchView("recover")}
                   className="link"
                 >
                   ¿Olvidaste tu contraseña?
                 </button>
               </p>

               <button
                 type="submit"
                 className="btn btn-primary btn-full"
                 disabled={loading}
               >
                 {loading ? "Iniciando..." : "Iniciar sesión"}
               </button>
             </form>
           )}

           {modalView === "register" && (
             <form onSubmit={handleRegister}>
               <div className="form-group">
                 <label className="form-label">Nombre</label>
                 <input
                   type="text"
                   className={`form-input ${
                     errors.nombre ? "input-error" : ""
                   }`}
                   value={nombre}
                   onChange={(e) => setNombre(e.target.value)}
                   required
                 />
                 {errors.nombre && (
                   <small className="error">{errors.nombre}</small>
                 )}
               </div>

               <div className="form-group">
                 <label className="form-label">Apellido</label>
                 <input
                   type="text"
                   className={`form-input ${
                     errors.apellido ? "input-error" : ""
                   }`}
                   value={apellido}
                   onChange={(e) => setApellido(e.target.value)}
                   required
                 />
                 {errors.apellido && (
                   <small className="error">{errors.apellido}</small>
                 )}
               </div>

               <div className="form-group">
                 <label className="form-label">Teléfono</label>
                 <input
                   type="number"
                   className={`form-input ${
                     errors.telefono ? "input-error" : ""
                   }`}
                   value={telefono}
                   onChange={(e) => setTelefono(e.target.value)}
                   required
                 />
                 {errors.telefono && (
                   <small className="error">{errors.telefono}</small>
                 )}
               </div>

               <div className="form-group">
                 <label className="form-label">DNI</label>
                 <input
                   type="number"
                   className={`form-input ${errors.dni ? "input-error" : ""}`}
                   value={dni}
                   onChange={(e) => setDni(e.target.value)}
                   required
                 />
                 {errors.dni && <small className="error">{errors.dni}</small>}
               </div>

               <div className="form-group">
                 <label className="form-label">Email</label>
                 <input
                   type="email"
                   className={`form-input ${errors.email ? "input-error" : ""}`}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
                 {errors.email && (
                   <small className="error">{errors.email}</small>
                 )}
               </div>

               <div className="form-group">
                 <label className="form-label">Plan</label>
                 <Form.Select
                   value={plan}
                   onChange={(e) => setPlan(e.target.value)}
                   required
                 >
                   <option value="" disabled>
                     Selecciona un plan
                   </option>
                   <option value="basico">Musculación</option>
                   <option value="intermedio">Clases</option>
                   <option value="premium">Full</option>
                   <option value="No quiero ningun plan">
                     No quiero ningun plan
                   </option>
                 </Form.Select>
                 {errors.plan && <small className="error">{errors.plan}</small>}
               </div>

               <div className="form-group">
                 <label className="form-label">Contraseña</label>
                 <div
                   className={`password-input ${
                     errors.password ? "input-error" : ""
                   }`}
                 >
                   <input
                     type={showPassword ? "text" : "password"}
                     className={`form-input ${
                       errors.password ? "input-error" : ""
                     }`}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
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
                 {errors.password && (
                   <small className="error">{errors.password}</small>
                 )}
               </div>

               <div className="form-group">
                 <label className="form-label">Repetir Contraseña</label>
                 <div className="password-input">
                   <input
                     type={showPassword2 ? "text" : "password"}
                     className={`form-input ${
                       errors.password2 ? "input-error" : ""
                     }`}
                     value={password2}
                     onChange={(e) => setPassword2(e.target.value)}
                     required
                   />
                   <button
                     type="button"
                     className="password-toggle"
                     onClick={() => setShowPassword2(!showPassword2)}
                   >
                     {showPassword2 ? "👁️" : "👁️‍🗨️"}
                   </button>
                 </div>
                 {errors.password2 && (
                   <small className="error">{errors.password2}</small>
                 )}
               </div>

               <div className="form-check">
                 <label className="checkbox-label">
                   <input
                     type="checkbox"
                     checked={aceptaTerminos}
                     onChange={(e) => setAceptaTerminos(e.target.checked)}
                     required
                   />
                   Acepto los{" "}
                   <Link to="/terminos-y-condiciones" className="link">
                     términos y condiciones
                   </Link>
                 </label>
                 {errors.aceptaTerminos && (
                   <small className="error">{errors.aceptaTerminos}</small>
                 )}
               </div>

               <p className="form-login-link">
                 ¿Ya tienes cuenta?{" "}
                 <button
                   type="button"
                   onClick={() => switchView("login")}
                   className="link"
                 >
                   Iniciar sesión
                 </button>
               </p>

               <button
                 type="submit"
                 className="btn btn-primary btn-full"
                 disabled={loading}
               >
                 {loading ? "Registrando..." : "Registrarse"}
               </button>
             </form>
           )}

           {modalView === "recover" && (
             <form onSubmit={handleRecover}>
               <div className="form-group">
                 <label className="form-label">Tu Email</label>
                 <input
                   type="email"
                   className={`form-input ${errors.email ? "input-error" : ""}`}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
               </div>

               <p className="form-login-link">
                 <button
                   type="button"
                   onClick={() => switchView("login")}
                   className="link"
                 >
                   Volver al login
                 </button>
               </p>

               <button
                 type="submit"
                 className="btn btn-primary btn-full"
                 disabled={loading}
               >
                 {loading ? "Enviando..." : "Enviar enlace de recuperación"}
               </button>
             </form>
           )}
         </div>
       </div>
     </div>
   );
 } */

/* "use client";

   import { Link } from "react-router-dom";
   import Form from "react-bootstrap/Form";
   import { useState } from "react";
   import Swal from "sweetalert2";
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
       setNombre("");
       setApellido("");
       setTelefono("");
       setDni("");
       setPlan("");
       setEmail("");
       setPassword("");
       setPassword2("");
       setAceptaTerminos(false);
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
         newErrors.password =
           "La contraseña no puede superar los 20 caracteres";
       }
       if (!password2.trim()) {
         newErrors.password2 = "Repetí tu contraseña";
       } else if (password2 !== password) {
         newErrors.password2 = "Las contraseñas no coinciden";
       }
       if (!plan) newErrors.plan = "Debes elegir un plan";
       if (!aceptaTerminos)
         newErrors.aceptaTerminos = "Debes aceptar los términos";
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
       else if (!/\S+@\S+\.\S+/.test(email))
         newErrors.email = "El email no es válido";
       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
     };

     const handleRegister = async (e) => {
       e.preventDefault();
       if (!validateForm()) return;
       setLoading(true);
       try {
         const response = await fetch(
           "http://localhost:5000/api/usuarios/login",
           {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
               nombre,
               apellido,
               telefono,
               dni,
               email,
               contraseña: password,
               plan,
             }),
           }
         );
         const data = await response.json();
         if (!response.ok) {
           throw new Error(data.mensaje || "Error en el registro");
         }
         // Guardar token y usuario
         localStorage.setItem("token", data.token);
         localStorage.setItem("usuario", JSON.stringify(data.usuario));
         onLogin(data.usuario);
         await Swal.fire({
           icon: "success",
           title: "Registro exitoso",
           text: "¡Bienvenido!",
         });
         switchView("login");
         console.log("Vista cambiada a login");
       } catch (error) {
         await Swal.fire({
           icon: "error",
           title: "Error",
           text: error.message,
         });
         setErrors({ general: error.message });
       } finally {
         setLoading(false);
       }
     };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Verificar tipo de contenido
      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        // Si la respuesta no es OK, intentar leer el texto para ver el error
        let errorMsg = "";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMsg =
            errorData.message || errorData.mensaje || "Error en la respuesta";
        } else {
          errorMsg = await res.text();
        }
        throw new Error(errorMsg);
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        // Aquí continua tu lógica con data
        Swal.fire({ icon: "success", title: "Inicio de sesión exitoso" });
        sessionStorage.setItem("token", data.token);
        onLogin(data.user?.role === "admin");
      } else {
        // La respuesta no es JSON, mostrar texto o error
        const text = await res.text();
        throw new Error("Respuesta inesperada: " + text);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setLoading(false);
    }
  };



     const handleSubmitRecovery = async (e) => {
       e.preventDefault();

       if (!email) {
         return Swal.fire({
           icon: "warning",
           title: "Por favor ingresa un email",
         });
       }

       setLoading(true);

       try {
         const res = await fetch(
           "http://localhost:5000/api/usuarios/recuperar",
           {
             method: "POST", // <-- asegurate de que sea POST
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ email }),
           }
         );

         const data = await res.json();

         if (!res.ok)
           throw new Error(data.message || "Error al recuperar contraseña");

         Swal.fire({
           icon: "success",
           title: "Revisa tu correo",
           text: "Se ha enviado una nueva contraseña a tu correo",
         });

         // podrías limpiar el campo o redirigir si querés
         setEmail("");
       } catch (err) {
         Swal.fire({ icon: "error", title: "Error", text: err.message });
       } finally {
         setLoading(false);
       }
     };


     if (!isOpen) return null;

     return (
       <div
         className="modal-overlay"
         onClick={(e) => e.target === e.currentTarget && handleClose()}
       >
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
           <div className="modal-header">
             <h2 className="modal-title">
               {modalView === "login"
                 ? "Iniciar sesión"
                 : modalView === "register"
                 ? "Registrarse"
                 : "Recuperar contraseña"}
             </h2>
             <button className="close-btn" onClick={handleClose}>
               ×
             </button>
           </div>

           <div className="modal-body">
             <p className="modal-subtitle">
               {modalView === "login" && "Bienvenido a FitGym"}
               {modalView === "register" && "Crea tu cuenta en FitGym"}
               {modalView === "recover" && "Recupera tu contraseña"}
             </p>

             {modalView === "login" && (
               <form onSubmit={handleSubmitLogin}>
                 {errors.email && (
                   <small className="error">{errors.email}</small>
                 )}
                 <div className="form-group">
                   <label htmlFor="email" className="form-label">
                     Email
                   </label>
                   <input
                     type="email"
                     className={`form-input ${
                       errors.email ? "input-error" : ""
                     }`}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                 </div>
                 {errors.password && (
                   <small className="error">{errors.password}</small>
                 )}
                 <div className="form-group">
                   <label htmlFor="contrasena" className="form-label">
                     Contraseña
                   </label>
                   <div className="password-input">
                     <input
                       type={showPassword ? "text" : "password"}
                       className={`form-input ${
                         errors.password ? "input-error" : ""
                       }`}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
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
                 <button
                   type="submit"
                   className="btn btn-primary btn-full"
                   disabled={loading}
                 >
                   {loading ? "Iniciando..." : "Iniciar sesión"}
                 </button>
                 <button
                   type="button"
                   className="link form-login-link"
                   onClick={() => switchView("recover")}
                 >
                   ¿Olvidaste tu contraseña?
                 </button>
                 <button
                   type="button"
                   className="link form-login-link"
                   onClick={() => switchView("register")}
                 >
                   ¿No tienes cuenta? Regístrate
                 </button>
               </form>
             )}

             {modalView === "register" && (
               <form onSubmit={handleRegister}>
                
                 <div className="form-group">
                   <label htmlFor="nombre" className="form-label">
                     Nombre
                   </label>
                   <input
                     type="text"
                     className={`form-input ${
                       errors.nombre ? "input-error" : ""
                     }`}
                     value={nombre}
                     onChange={(e) => setNombre(e.target.value)}
                   />
                   {errors.nombre && (
                     <small className="error">{errors.nombre}</small>
                   )}
                 </div>
                      <div className="form-group">
                   <label htmlFor="apellido" className="form-label">
                     Apellido
                   </label>
                   <input
                     type="text"
                     className={`form-input ${
                       errors.apellido ? "input-error" : ""
                     }`}
                     value={apellido}
                     onChange={(e) => setApellido(e.target.value)}
                   />
                   {errors.apellido && (
                     <small className="error">{errors.apellido}</small>
                   )}
                 </div>
                
                 <div className="form-group">
                   <label htmlFor="telefeno" className="form-label">
                     Teléfono
                   </label>
                   <input
                     type="number"
                     className={`form-input ${
                       errors.telefono ? "input-error" : ""
                     }`}
                     value={telefono}
                     onChange={(e) => setTelefono(e.target.value)}
                   />
                   {errors.telefono && (
                     <small className="error">{errors.telefono}</small>
                   )}
                 </div>
       
                 <div className="form-group">
                   <label htmlFor="dni" className="form-label">
                     DNI
                   </label>
                   <input
                     type="number"
                     className={`form-input ${errors.dni ? "input-error" : ""}`}
                     value={dni}
                     onChange={(e) => setDni(e.target.value)}
                   />
                   {errors.dni && <small className="error">{errors.dni}</small>}
                 </div>
            
                 <div className="form-group">
                   <label htmlFor="email" className="form-label">
                     Email
                   </label>
                   <input
                     type="email"
                     className={`form-input ${
                       errors.email ? "input-error" : ""
                     }`}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                   {errors.email && (
                     <small className="error">{errors.email}</small>
                   )}
                 </div>
         
                 <div className="form-group">
                   <label htmlFor="plan" className="form-label">
                     Plan
                   </label>
                   <Form.Select
                     className={errors.plan ? "input-error" : ""}
                     value={plan}
                     onChange={(e) => setPlan(e.target.value)}
                   >
                     <option value="" disabled>
                       Selecciona un plan
                     </option>
                     <option value="basico">Musculación</option>
                     <option value="intermedio">Clases</option>
                     <option value="premium">Full</option>
                     <option value="No quiero ningun plan">
                       No quiero plan
                     </option>
                   </Form.Select>
                   {errors.plan && (
                     <small className="error">{errors.plan}</small>
                   )}
                 </div>
            
                 <div className="form-group">
                   <label htmlFor="contasena" className="form-label">
                     Contraseña
                   </label>
                   <div className="password-input">
                     <input
                       type={showPassword ? "text" : "password"}
                       className={`form-input ${
                         errors.password ? "input-error" : ""
                       }`}
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                     />
                     <button
                       type="button"
                       className="password-toggle"
                       onClick={() => setShowPassword(!showPassword)}
                     >
                       {showPassword ? "👁️" : "👁️‍🗨️"}
                     </button>
                   </div>
                   {errors.password && (
                     <small className="error">{errors.password}</small>
                   )}
                 </div>
          
                 <div className="form-group">
                   <label htmlFor="repetir contrasena" className="form-label">
                     Repetir Contraseña
                   </label>
                   <div className="password-input">
                     <input
                       type={showPassword2 ? "text" : "password"}
                       className={`form-input ${
                         errors.password2 ? "input-error" : ""
                       }`}
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
                   {errors.password2 && (
                     <small className="error">{errors.password2}</small>
                   )}
                 </div>
              
                 <div className="form-check">
                   <label className="checkbox-label">
                     <input
                       type="checkbox"
                       checked={aceptaTerminos}
                       onChange={(e) => setAceptaTerminos(e.target.checked)}
                     />
                     Acepto los{" "}
                     <Link to="/terminos-y-condiciones" className="link">
                       términos y condiciones
                     </Link>
                   </label>
                   {errors.aceptaTerminos && (
                     <small className="error">{errors.aceptaTerminos}</small>
                   )}
                 </div>
                 <button
                   type="submit"
                   className="btn btn-primary btn-full"
                   disabled={loading}
                 >
                   {loading ? "Registrando..." : "Registrarse"}
                 </button>
                 <button
                   type="button"
                   className="link form-login-link"
                   onClick={() => switchView("login")}
                 >
                   ¿Ya tienes cuenta? Iniciar sesión
                 </button>
               </form>
             )}

             {modalView === "recover" && (
               <form onSubmit={handleRecover}>x 
                 <div className="form-group">
                   <label htmlFor="email" className="form-label">
                     Email para recuperación
                   </label>
                   <input
                     type="email"
                     className={`form-input ${
                       errors.email ? "input-error" : ""
                     }`}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                   />
                   {errors.email && (
                     <small className="error">{errors.email}</small>
                   )}
                 </div>
                 <button
                   type="submit"
                   className="btn btn-primary btn-full"
                   disabled={loading}
                 >
                   {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                 </button>
                 <button
                   type="button"
                   className="link form-login-link"
                   onClick={() => switchView("login")}
                 >
                   Volver al login
                 </button>
               </form>
             )}
           </div>
         </div>
       </div>
     );
   }

   
=======
>>>>>>> d33efbff8ce9da15fe6a06c9e709438eae50e2cf
 */
