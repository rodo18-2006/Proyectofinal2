import { useState } from "react";
import "./CommentForm.css"; // Importamos el CSS que vamos a crear

export default function CommentForm({ onNewComment }) {
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoComentario = {
      name: newName,
      comment: newComment,
      rating: parseInt(newRating),
    };

    if (onNewComment) {
      onNewComment(nuevoComentario);
    }

    setNewName("");
    setNewComment("");
    setNewRating(5);
    setMensajeEnviado(true);
    setTimeout(() => setMensajeEnviado(false), 3000);
  };

  return (
    <section className="form-container">
      <h2>Dejá tu comentario 💬</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <label htmlFor="name">Tu nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Ej: Ana Martínez"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />

        <label htmlFor="comment">Tu experiencia...</label>
        <textarea
          id="comment"
          rows={5}
          placeholder="Escribí tu experiencia..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />

        <label htmlFor="rating">Calificación</label>
        <select
          id="rating" 
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
        >
          <option value={5}>⭐⭐⭐⭐⭐ - Excelente</option>
          <option value={4}>⭐⭐⭐⭐ - Muy bueno</option>
          <option value={3}>⭐⭐⭐ - Bueno</option>
          <option value={2}>⭐⭐ - Regular</option>
          <option value={1}>⭐ - Malo</option>
        </select>

        <button type="submit">Enviar Comentario</button>
      </form>

      {mensajeEnviado && (
        <p className="success-message">¡Comentario enviado con éxito!</p>
      )}
    </section>
  );
}
