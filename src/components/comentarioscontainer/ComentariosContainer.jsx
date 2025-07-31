import { useState, useEfect, useEffect } from "react";

import Testimonials from "../testimonials/Testimonials";
import Comments from "../agregarcomentario/comments";

export default function ComentariosContainer() {
    const [comments, setComments] = useState ([]);

    useEffect(() => {

fetch("http://localhost:5000/api/comment")
.then((res) => res.json())
.then((data) => setComments(data))
.catch((err) => console.error("Error al obtener comentar", err));
}, []);

const handleNewComment = (nuevoComentario) => {
    setComments((prev) => [nuevoComentario, ...prev]);

};

return (
    <>
    < Comments onNewComment={handleNewComment}/>
    <Testimonials data={comments} />
    </>
);
}



    




    

