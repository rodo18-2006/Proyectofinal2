import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ClasesC from "./pages/clasesC";
import Cuenta from "./pages/Cuenta";
import Planes from "./pages/Planes";
import Clases from "./components/clases/Clases";
import SolicitarClasesC from "./pages/SolicitarClasesC";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import { UsuariosProvider } from "./components/context/UsuariosContext";

function App() {
  return (
    <UsuariosProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          {/* ✅ NAVBAR siempre visible */}
          <Navbar />

          {/* ✅ CONTENIDO principal por rutas */}
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/plan-details/:planId"
                element={<PlanDetailsPage />}
              />
              <Route path="/clases" element={<ClasesC />} />
              <Route path="/cuenta" element={<Cuenta />} />
              <Route path="/pagar" element={<Planes />} />
              <Route path="/solicitar-clase" element={<SolicitarClasesC />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          {/* ✅ FOOTER siempre visible */}
          <Footer />
        </div>
      </Router>
    </UsuariosProvider>
  );
}

export default App;
