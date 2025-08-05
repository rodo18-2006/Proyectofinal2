/* import React, { useContext, useState } from "react";
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
 */

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


 "use client";

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
         // Cerrá modal o lo que necesites después de login
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
 }
