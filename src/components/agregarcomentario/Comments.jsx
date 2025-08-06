import { useState } from "react";
import "./Commentform.css";

export default function CommentsForm({ onNewComment }) {
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


    fetch("http://localhost:5000/api/comment", {
      method: "POST",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify(nuevoComentario),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewName(data);
        setNewComment("");
        setNewRating(5);
        setMensajeEnviado(true);
        setTimeout(() => setMensajeEnviado(false), 3000);
      })

      .catch((err) => console.error("Error al enviar comentario:", err));
  };


  return (
    <section className="form-container">
      <h2>Dejá tu comentario🗨️</h2>
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          placeholder="Ej: Ana Martinez"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />

        <label htmlFor="comment">Comentario</label>
        <input
          type="text"
          id="comment"
          placeholder="Dejanos tu opinión"
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
