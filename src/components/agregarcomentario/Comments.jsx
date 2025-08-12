import { useState, useContext } from "react";
import { UsuariosContext } from "../context/UsuariosContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Commentform.css";

export default function CommentsForm({ onNewComment }) {
  const { user } = useContext(UsuariosContext);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!newComment.trim())
      newErrors.newComment = "El comentario es obligatorio";
    
    if (!newRating) newErrors.newRating = "Selecciona una calificación";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Debes iniciar sesión para dejar un comentario.");
      return;
    }

    if (!validate()) return;

    const nuevoComentario = {
      name: user.nombre,
      comment: newComment,
      rating: parseInt(newRating),
    };

    fetch("http://localhost:5000/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoComentario),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewComment("");
        setNewRating(5);
        setMensajeEnviado(true);
        setTimeout(() => setMensajeEnviado(false), 3000);
        setErrors({});

        if (onNewComment) {
          onNewComment(data);
        }
      })
      .catch((err) => console.error("Error al enviar comentario:", err));
  };

  return (
    <section className="form-container">
      <h2>Dejá tu comentario🗨️</h2>

      {!user ? (
        <p
          style={{
            color: "#ff6b35",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          Debes <strong>iniciar sesión</strong> para dejar un comentario.
        </p>
      ) : (
        <form className="comment-form" onSubmit={handleSubmit} noValidate>
          <label>Nombre</label>
          <input
            type="text"
            value={user.nombre}
            disabled
            className="form-control"
          />

          <label>Comentario</label>
          <input
            type="text"
            placeholder="Dejanos tu opinión"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={`form-control ${errors.newComment ? "input-error" : ""}`}
          />
          {errors.newComment && (
            <small style={{ color: "#ff6b35" }}>{errors.newComment}</small>
          )}

          <label>Calificación</label>
          <select
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)}
            className={`form-control ${errors.newRating ? "input-error" : ""}`}
          >
            <option value={5}>⭐⭐⭐⭐⭐ - Excelente</option>
            <option value={4}>⭐⭐⭐⭐ - Muy bueno</option>
            <option value={3}>⭐⭐⭐ - Bueno</option>
            <option value={2}>⭐⭐ - Regular</option>
            <option value={1}>⭐ - Malo</option>
          </select>
          {errors.newRating && (
            <small style={{ color: "#ff6b35" }}>{errors.newRating}</small>
          )}

          <button type="submit">Enviar Comentario</button>
        </form>
      )}

      {mensajeEnviado && (
        <p className="success-message">¡Comentario enviado con éxito!</p>
      )}
    </section>
  );
}
