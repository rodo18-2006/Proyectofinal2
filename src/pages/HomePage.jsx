import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Navbar from "../components/navbar/Navbar";
import Plans from "../components/plan/Plans";
import Services from "../components/services/Sevices";
import Testimonials from "../components/testimonials/Testimonials";
import Trainers from "../components/trainers/Trainers";
import Weather from "../components/weather/Weather";


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Weather />
      <Services />
      <Plans />
      <Trainers />
      <Testimonials />
      <Footer />
    </div>
  );
}
