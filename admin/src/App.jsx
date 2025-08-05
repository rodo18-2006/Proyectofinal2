import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UsuariosProvider>
        <Router>
          <Routes>
            <Route path="/admin/usuarios" element={<AdminUsuariosPage />}/>
            <Route path="/" element={<LoginC />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/clases" element={<Clases />} />
            <Route path="/inscripciones" element={<Inscripciones />} />
            <Route path="/estadisticas" element={<EstadisticasC />} />
            <Route path="/configuracion" element={<ConfiguracionC />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/consultas" element={<ConsultasC />} />
            <Route path="/cuotas-pagadas" element={<CuotasPagas />} />
            <Route path="cuotas-pendientes" element={<Pendientes />} />
            <Route path="/metas" element={<Metas />} />
            <Route path="/alertas" element={<Alertas />} />
          </Routes>
        </Router>
      </UsuariosProvider>
    </>
  );
}

export default App;
