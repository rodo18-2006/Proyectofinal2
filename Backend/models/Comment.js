
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;

import { useState, useEffect } from "react";
import CommentsForm from "../agregarcomentario/Comments";
import Testimonials from "../testimonials/Testimonials";

export default function ComentariosContainer() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/comment")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error al obtener comentarios:", err));
  }, []);

  const handleNewComment = (nuevoComentario) => {
    setComments((prev) => [nuevoComentario, ...prev]);

    
  
  };

  return (
    <>
      <CommentsForm onNewComment={handleNewComment} />
      <Testimonials data={comments} />
    </>
  );
}
