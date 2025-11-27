import { Link } from "react-router-dom";
import logo from "../IMAGES/logo_CreditSmart.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" height="64" className="me-3" />
          <span className="text-creditsmart fw-bold">CreditSmart</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li><Link className="nav-link" to="/">Catálogo</Link></li>
            <li><Link className="nav-link" to="/simulador">Simulador</Link></li>
            <li><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
          </ul>

          <Link className="btn btn-success" to="/solicitar">Solicitar Crédito</Link>
        </div>
      </div>
    </nav>
  );
}
