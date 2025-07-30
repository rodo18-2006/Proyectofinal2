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
