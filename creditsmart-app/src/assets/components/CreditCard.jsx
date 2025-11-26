// src/components/CreditCard.jsx
import React from "react";
import { Link } from "react-router-dom";

// Tarjeta de producto (crédito)
// Comentarios: este componente recibe un `product` y lo muestra bonito.
// Para practicar: observa cómo usamos `toLocaleString()` para formatear números.
export default function CreditCard({ product }) {
  return (
    <article className="card h-100 shadow-sm">
      {/* La imagen viene desde el objeto `product.img` (ruta relativa desde /src) */}
      <img
        src={product.img}
        alt={product.name}
        className="card-img-top"
        style={{ height: 160, objectFit: "contain" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>

        {/* Mostrar la tasa anual con formato sencillo */}
        <p className="text-success fw-bold fs-5">{product.rate}% anual</p>

        {/* Mostrar rango de montos con formato local (separa miles) */}
        <p className="text-muted">
          ${product.min.toLocaleString()} – ${product.max.toLocaleString()}
        </p>

        <div className="mt-auto">
          <Link className="btn btn-success btn-sm" to="/solicitar">
            Solicitar
          </Link>
        </div>
      </div>
    </article>
  )
}
