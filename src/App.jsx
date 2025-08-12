import React, { useState, useEffect } from "react";

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

import ScrollTopButton from "./components/ScrollTopButton/ScrollTopButton";
import Navbar from "./components/navbar/Navbar";


import { UsuariosProvider } from "./components/context/UsuariosContext";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import LoginModal from "./components/login/LoginModal";
import RecuperarContrasena from "./components/recuperarcontrasena/RecuparerContrasena";
import Footer from "./components/footer/Footer";

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

function AppRoutes({
  openLoginModal,
  showLogin,
  closeLoginModal,
  handleSubmitLogin,
}) {
  usePageTitle();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar onLoginClick={openLoginModal} />

      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/plan-details/:planId" element={<PlanDetailsPage />} />
          <Route path="/clases" element={<ClasesC />} />
          <Route path="/cuenta" element={<Cuenta />} />

          <Route
            path="/pagar"
            element={
              <ProtectedRoute openLoginModal={openLoginModal}>
                <Planes />
              </ProtectedRoute>
            }
          />
          <Route path="/solicitar-clase" element={<SolicitarClasesC />} />
          <Route path="/reset-password" element={<RecuperarContrasena />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer onLoginClick={openLoginModal} />

      <LoginModal
        isOpen={showLogin}
        onClose={closeLoginModal}
        onLogin={handleSubmitLogin}
      />
    </div>
  );
}
  


function App() {
  const [showLogin, setShowLogin] = useState(false);

  const openLoginModal = () => setShowLogin(true);
  const closeLoginModal = () => setShowLogin(false);

  const handleSubmitLogin = (userData) => {
    console.log("Login exitoso:", userData);
    closeLoginModal();
  };

  return (
    <UsuariosProvider>
      <Router>
        <AppRoutes
          openLoginModal={openLoginModal}
          showLogin={showLogin}
          closeLoginModal={closeLoginModal}
          handleSubmitLogin={handleSubmitLogin}
        />
      </Router>
    </UsuariosProvider>
  );
}


export default App;
