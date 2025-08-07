import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar/Navbar";
import AdminFooter from "./components/footer/Footer";

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

import { UsuariosProvider } from "./components/context/UsuariosContext";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
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

    document.title = titles[location.pathname] || "FitGym 💪";
  }, [location]);
}

function AppRoutes() {
  usePageTitle();

  return (
    <Routes>
      <Route path="/" element={<LoginC />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/clases" element={<Clases />} />
      <Route path="/turnos-solicitados" element={<Inscripciones />} />
      <Route path="/estadisticas" element={<EstadisticasC />} />
      <Route path="/configuracion" element={<ConfiguracionC />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/consultas" element={<ConsultasC />} />
      <Route path="/cuotas-pagadas" element={<CuotasPagas />} />
      <Route path="/cuotas-pendientes" element={<Pendientes />} />
      <Route path="/metas" element={<Metas />} />
      <Route path="/alertas" element={<Alertas />} />
      <Route path="/admin/usuarios" element={<AdminUsuariosPage />} />
    </Routes>
  );
}

export default function App() {
  const location = useLocation();

  // Mostrar navbar y footer excepto en login (/)
  const mostrarNavFooter = location.pathname !== "/";

  return (
    <UsuariosProvider>
      <div className="App d-flex flex-column min-vh-100">
        {mostrarNavFooter && <Navbar />}
        <main className="flex-grow-1">
          <AppRoutes />
        </main>
        {mostrarNavFooter && <AdminFooter />}
      </div>
    </UsuariosProvider>
  );
}
