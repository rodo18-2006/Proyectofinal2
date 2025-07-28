import { useState } from "react";

import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Navbar from "../components/navbar/Navbar";
import Plans from "../components/plan/Plans";
import Services from "../components/services/Sevices";
import Testimonials from "../components/testimonials/Testimonials";
import Trainers from "../components/trainers/Trainers";
import Weather from "../components/weather/Weather";
import Paginacion from "../components/paginacion/Paginacion";
import Comments from "../components/agregarcomentario/comments";

export default function HomePage() {
  const allTestimonials = [
    { name: "Carlos Quintana", comment: "¡Excelente atención!", rating: 5 },
    {
      name: "Bautista Alavaréz",
      comment: "El mejor gimnasio de todos.",
      rating: 5,
    },
    {
      name: "Juan Bulacio",
      comment: "Ambiente ideal para entrenar.",
      rating: 5,
    },
    { name: "Ana Perez", comment: "Me encantó el servicio.", rating: 4 },
    { name: "Marcos Cano", comment: "Todo impecable.", rating: 5 },
    { name: "Matias López", comment: "Muy buenos entrenadores.", rating: 5 },
    {
      name: "María González",
      comment:
        "Excelente gimnasio, los entrenadores son muy profesionales y el ambiente es motivador.",
      rating: 5,
    },
    {
      name: "Violeta Pérez",
      comment:
        "Las instalaciones son de primera calidad y los horarios son muy flexibles.",
      rating: 5,
    },
    {
      name: "Sofia Martinez",
      comment:
        "Me encanta la variedad de clases que ofrecen. Siempre hay algo nuevo que probar.",
      rating: 5,
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestimonials = allTestimonials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Weather />
      <Services />
      <Plans />
      <Trainers />
      <Testimonials data={currentTestimonials} />
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={allTestimonials.length}
        onPageChange={handlePageChange}
      />
      <Comments/>
      <Footer />
    </div>
  );
}
