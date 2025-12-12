// Footer.jsx (Actualizado)

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-top py-5 mt-5">
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <h5 className="text-creditsmart fw-bold mb-3">CreditSmart</h5>
            <p className="text-muted small">
              Tu aliado financiero de confianza. Ofrecemos soluciones crediticias flexibles y transparentes.
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Enlaces rápidos</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-muted text-decoration-none">Catálogo</Link></li>
              <li><Link to="/simulador" className="text-muted text-decoration-none">Simulador</Link></li>
              <li><Link to="/solicitudes" className="text-muted text-decoration-none">Listado Solicitudes</Link></li>
              <li><Link to="/nosotros" className="text-muted text-decoration-none">Nosotros</Link></li>
              <li><Link to="/solicitar" className="text-muted text-decoration-none">Solicitar crédito</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-3">Contáctanos</h6>
            <p className="text-muted small">📞 +57 604 123 4567</p>
            <p className="text-muted small">✉️ contacto@creditsmart.com</p>
            <p className="text-muted small">📍 Medellín, Colombia</p>
          </div>

        </div>

        <hr />
        <p className="text-center small text-muted">© 2025 CreditSmart. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}