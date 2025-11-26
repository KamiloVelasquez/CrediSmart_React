// src/pages/Simulador.jsx
import React, { useState } from "react";
import { credits } from "../../data/credits";
import CreditCard from "../components/CreditCard";

// Simulador: permite filtrar y ordenar créditos
// Comentario: lo dejamos sencillo para que puedas entender los hooks `useState`.
export default function Simulador() {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("");
  const [rateOrder, setRateOrder] = useState("");

  // Filtramos por nombre, rango y orden por tasa
  const filtered = credits
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    .filter((c) => {
      if (range === "1") return c.min <= 5000000;
      if (range === "2") return c.min > 5000000 && c.min <= 50000000;
      if (range === "3") return c.min > 50000000;
      return true;
    })
    .sort((a, b) => {
      if (rateOrder === "asc") return a.rate - b.rate;
      if (rateOrder === "desc") return b.rate - a.rate;
      return 0;
    });

  return (
    <main className="container py-4">
      <h1 className="text-success mb-4">Simulador de Créditos</h1>

      {/* Controles de búsqueda y filtros */}
      <section className="bg-white p-4 rounded shadow mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Buscar por nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Vivienda"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Rango de monto</label>
            <select
              className="form-select"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="1">Hasta $5.000.000</option>
              <option value="2">$5M – $50M</option>
              <option value="3">Más de $50M</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Ordenar por tasa</label>
            <select
              className="form-select"
              value={rateOrder}
              onChange={(e) => setRateOrder(e.target.value)}
            >
              <option value="">Sin ordenar</option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
        </div>
      </section>

      {/* Resultados: mostramos tarjetas usando `CreditCard` */}
      <div className="row g-4">
        {filtered.length === 0 ? (
          <p className="text-center text-muted fs-5">No hay créditos disponibles</p>
        ) : (
          filtered.map((c) => (
            <div className="col-md-4" key={c.id}>
              <CreditCard product={c} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
