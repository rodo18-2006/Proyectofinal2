import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ClasesC from "./pages/clasesC";
import Cuenta from "./pages/Cuenta";
import Planes from "./pages/Planes";
import SolicitarClasesC from "./pages/SolicitarClasesC";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { UsuariosProvider } from "./components/context/UsuariosContext";

// 🧠 Hook para actualizar el título de la pestaña
function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      "/": "Inicio | FitGym 💪",
      "/about": "Nosotros | FitGym 💪",
      "/contact": "Contacto | FitGym 💪",
      "/clases": "Clases | FitGym 💪",
      "/cuenta": "Mi Cuenta | FitGym 💪",
      "/pagar": "Planes | FitGym 💪",
      "/solicitar-clase": "Solicitar Clase | FitGym 💪",
    };

    if (path.startsWith("/plan-details/")) {
      document.title = "Detalles del Plan | FitGym 💪";
    } else {
      document.title = titles[path] || "Página no encontrada | FitGym 💪";
    }
  }, [location]);
}

// ✅ Componente para definir las rutas + actualizar título
function AppRoutes() {
  usePageTitle();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/plan-details/:planId" element={<PlanDetailsPage />} />
      <Route path="/clases" element={<ClasesC />} />
      <Route path="/cuenta" element={<Cuenta />} />
      <Route path="/pagar" element={<Planes />} />
      <Route path="/solicitar-clase" element={<SolicitarClasesC />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// ✅ App principal
function App() {
  return (
    <UsuariosProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />
          <div className="flex-grow-1">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </Router>
    </UsuariosProvider>
  );
}

export default App;
