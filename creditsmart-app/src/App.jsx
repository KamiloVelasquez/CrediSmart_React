import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";

// Pages
import Home from "./assets/pages/Home";
import Simulador from "./assets/pages/Simulador";
import Solicitar from "./assets/pages/Solicitar";
import Nosotros from "./assets/pages/Nosotros";
import Solicitudes from "./assets/pages/Solicitudes";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulador" element={<Simulador />} />
        <Route path="/solicitar" element={<Solicitar />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
