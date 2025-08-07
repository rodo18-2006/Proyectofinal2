import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar/Navbar";
import LoginC from "./components/login/LoginC";

import Inicio from "./page/inicio";
import Usuarios from "./page/Usuarios";
import Clases from "./page/Clases";
import Inscripciones from "./page/Inscripciones";
import EstadisticasC from "./page/EstadisticasC";
import ConfiguracionC from "./page/ConfiguracionC";
import Perfil from "./page/Perfil";
import ConsultasC from "./page/ConsultasC";
import CuotasPagas from "./page/CuotasPagas";
import Pendientes from "./page/Pendientes";
import Metas from "./page/Metas";
import Alertas from "./page/Alertas";
import AdminUsuariosPage from "./page/AdminUsuariosPage";
import { UsuariosProvider } from "../src/components/context/UsuariosContext";
import AdminFooter from "./components/footer/Footer";

// 👇 Esta función es para actualizar el título según la ruta
function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    const titles = {
      "/": "Login | FitGym 💪",
      "/inicio": "Inicio | FitGym 💪",
      "/usuarios": "Usuarios | FitGym 💪",
      "/clases": "Clases | FitGym 💪",
      "/inscripciones": "Inscripciones | FitGym 💪",
      "/estadisticas": "Estadísticas | FitGym 💪",
      "/configuracion": "Configuración | FitGym 💪",
      "/perfil": "Perfil | FitGym 💪",
      "/consultas": "Consultas | FitGym 💪",
      "/cuotas-pagadas": "Cuotas Pagadas | FitGym 💪",
      "/cuotas-pendientes": "Cuotas Pendientes | FitGym 💪",
      "/metas": "Metas | FitGym 💪",
      "/alertas": "Alertas | FitGym 💪",
      "/admin/usuarios": "Administrar Usuarios | FitGym 💪",
    };

    document.title = titles[path] || "FitGym 💪";
  }, [location]);
}

// 👇 Separás las rutas en un componente donde podés usar la función del título
function AppRoutes() {
  usePageTitle();

  return (
    <Routes>
      <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/" element={<LoginC />} />
      <Route path="/clases" element={<Clases />} />
      <Route path="/inscripciones" element={<Inscripciones />} />
      <Route path="/estadisticas" element={<EstadisticasC />} />
      <Route path="/configuracion" element={<ConfiguracionC />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/consultas" element={<ConsultasC />} />
      <Route path="/cuotas-pagadas" element={<CuotasPagas />} />
      <Route path="/cuotas-pendientes" element={<Pendientes />} />
      <Route path="/metas" element={<Metas />} />
      <Route path="/alertas" element={<Alertas />} />
    </Routes>
  );
}

function App() {
  return (
    <UsuariosProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navbar />
          <div className="flex-grow-1">
            <AppRoutes /> {/* 👈 aquí usás las rutas con títulos dinámicos */}
          </div>
          <AdminFooter />
        </div>
      </Router>
    </UsuariosProvider>
  );
}

export default App;
