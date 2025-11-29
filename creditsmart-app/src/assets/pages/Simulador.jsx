import React, { useState, useMemo } from "react";
import CreditCard from "../components/CreditCard";
import { creditos } from "../../data/creditos";

export default function Simulador() {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("");
  const [rateOrder, setRateOrder] = useState("");

  // Filtrado + ordenamiento (useMemo para ligera optimización)
  const resultados = useMemo(() => {
    let list = creditos.filter((c) =>
      c.nombre.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (range === "1") {
      list = list.filter((c) => c.montoMax <= 5000000 || c.montoMin <= 5000000);
    } else if (range === "2") {
      list = list.filter((c) => c.montoMin > 5000000 && c.montoMax <= 50000000);
    } else if (range === "3") {
      list = list.filter((c) => c.montoMin > 50000000);
    }

    if (rateOrder === "asc") list.sort((a, b) => a.tasa - b.tasa);
    if (rateOrder === "desc") list.sort((a, b) => b.tasa - a.tasa);

    return list;
  }, [query, range, rateOrder]);

  function limpiarFiltros() {
    setQuery("");
    setRange("");
    setRateOrder("");
  }

  return (
    <main className="container py-5">
      <h1 className="custom-products-section text-success text-center mb-4">Busca y Compara Créditos</h1>

      {/* Filtros */}
      <section className="bg-white p-4 rounded shadow-lg mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre del producto</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej: Vivienda, Vehículo..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Rango de monto</label>
            <select className="form-select" value={range} onChange={(e) => setRange(e.target.value)}>
              <option value="">Todos los montos</option>
              <option value="1">Hasta $5.000.000</option>
              <option value="2">$5.000.001 – $50.000.000</option>
              <option value="3">Más de $50.000.000</option>
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Ordenar por tasa</label>
            <select className="form-select" value={rateOrder} onChange={(e) => setRateOrder(e.target.value)}>
              <option value="">Sin ordenar</option>
              <option value="asc">Menor a mayor</option>
              <option value="desc">Mayor a menor</option>
            </select>
          </div>
        </div>

        <div className="text-end mt-3">
          <button type="button" className="btn btn-success-2" onClick={limpiarFiltros}>
            Limpiar
          </button>
        </div>
      </section>

      {/* Resultados */}
      <h2 className="custom-products-section text-success">Resultados</h2>
      <div className="row g-4">
        {resultados.length === 0 ? (
          <p className="text-center text-muted fs-5">No hay créditos disponibles</p>
        ) : (
          resultados.map((producto) => <CreditCard key={producto.id} {...producto} />)
        )}
      </div>
    </main>
  );
}
