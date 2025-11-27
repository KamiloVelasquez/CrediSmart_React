import { Link } from "react-router-dom";

export default function CreditCard({ nombre, tasa, montoMin, montoMax, plazo, img }) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="card p-3 shadow-sm h-100">
        <div className="card-body">
          <img src={img} alt={nombre} width="40" className="mb-3" />

          <h5 className="card-title custom-text-primary mb-3">{nombre}</h5>

          <ul className="list-unstyled product-details mt-3">
            <li>Tasa: <span className="float-end fw-bold text-success">{tasa}% mensual</span></li>
            <li>Monto: <span className="float-end fw-bold">${montoMin.toLocaleString()} - ${montoMax.toLocaleString()}</span></li>
            <li>Plazo: <span className="float-end fw-bold">{plazo} meses</span></li>
          </ul>

          <div className="d-grid mt-4">
            <Link className="btn btn-primary custom-btn" to="/solicitar">
              Solicitar Ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
