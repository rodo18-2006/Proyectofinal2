import { useState, useEffect } from "react";
import CommentsForm from "../agregarcomentario/Comments";
import Testimonials from "../testimonials/Testimonials";

export default function ComentariosContainer() {
  const itemsPorPagina = 3;
  const [comments, setComments] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/comment")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error al obtener comentarios:", err));
  }, []);

  const handleNewComment = (nuevoComentario) => {
    setComments((prev) => [nuevoComentario, ...prev]);
    setPaginaActual(1);
  };

  const indexUltimoComentario = paginaActual * itemsPorPagina;
  const indexPrimerComentario = indexUltimoComentario - itemsPorPagina;
  const comentariosPagina = comments.slice(indexPrimerComentario, indexUltimoComentario);

  return (
    <>
      {/* Formulario para agregar comentario */}
      <CommentsForm onNewComment={handleNewComment} />

      {/* Lista de comentarios paginados */}
      <Testimonials data={comentariosPagina} />

      {/* Paginación */}
    </>
  );
}






    

