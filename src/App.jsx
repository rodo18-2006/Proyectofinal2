// App.jsx en la app del público

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

import ClasesC from "./pages/clasesC";
import Cuenta from "./pages/Cuenta";
import { UsuariosProvider } from "./components/context/UsuariosContext"; // <--- Agregá esto
import Planes from "./pages/Planes";
import Clases from "./components/clases/Clases";
import SolicitarClasesC from "./pages/SolicitarClasesC";
import ScrollTopButton from "./components/ScrollTopButton/ScrollTopButton";

function App() {
  return (
    <UsuariosProvider>
      {" "}
      {/* <--- Agregá esto */}
      <ScrollTopButton/>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/plan-details/:planId" element={<PlanDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/clases" element={<ClasesC />} />
            <Route path="/cuenta" element={<Cuenta />} />
            <Route path="/pagar" element={<Planes />} />
            <Route path="/solicitar-clase" element={<SolicitarClasesC  />} />
          </Routes>
        </div>
      </Router>
    </UsuariosProvider>
  );
}

/* import "./App.css";
import Planes from "./pages/Planes";
import  ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";


function App() {
  return (
    <Router>
      <div className="App">
       <ScrollToTopButton /> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/plan-details/:planId" element={<PlanDetailsPage />} />
          <Route path="/pagar" element={<Planes />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>

  );
} */

export default App;
