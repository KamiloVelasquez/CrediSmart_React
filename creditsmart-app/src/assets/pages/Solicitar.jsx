// Formulario de solicitud de crédito
// Comentarios: usamos un estado local para simular el envío. En una app real
// enviarías los datos a un servidor con fetch/axios.
import React, { useState } from "react";

const solicitudes = []; // almacenamiento temporal en memoria (solo para ejemplo)

export default function Solicitar() {
  const [form, setForm] = useState({ nombre: "", cedula: "", email: "", monto: "", plazo: "" });
  const [cuota, setCuota] = useState(null);
  const [mensaje, setMensaje] = useState("");

  // Actualiza el formulario de forma controlada
  function actualizar(e) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    // Recalcular la cuota si ambos campos numéricos tienen dato
    if ((id === "monto" || id === "plazo") && (id === "monto" ? value : form.monto) && (id === "plazo" ? value : form.plazo)) {
      const montoVal = id === "monto" ? value : form.monto;
      const plazoVal = id === "plazo" ? value : form.plazo;
      calcularCuota(montoVal, plazoVal);
    }
  }

  // Fórmula simplificada para cuota (para fines didácticos)
  function calcularCuota(monto, plazo) {
    const tasaMensual = 0.015; // ~18% anual dividido entre meses (ejemplo)
    const n = Number(plazo);
    const m = Number(monto);
    if (n > 0 && m > 0) {
      const cuotaMensual = (m * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -n));
      setCuota(Math.round(cuotaMensual));
    }
  }

  function enviar(e) {
    e.preventDefault();
    // Validación simple
    if (!form.nombre || !form.email || !form.monto || !form.plazo) {
      setMensaje("Completa todos los campos obligatorios");
      return;
    }

    solicitudes.push({ ...form, cuota });
    setMensaje("Solicitud enviada con éxito ✔");

    // Limpiar formulario
    setForm({ nombre: "", cedula: "", email: "", monto: "", plazo: "" });
    setCuota(null);
  }

  return (
    <main className="container py-4">
      <h1 className="text-success mb-4">Solicitud de Crédito</h1>

      <form className="bg-white p-4 shadow rounded" onSubmit={enviar}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input id="nombre" className="form-control" value={form.nombre} onChange={actualizar} required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Cédula</label>
            <input id="cedula" className="form-control" value={form.cedula} onChange={actualizar} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input id="email" type="email" className="form-control" value={form.email} onChange={actualizar} required />
          </div>

          <div className="col-md-3">
            <label className="form-label">Monto solicitado</label>
            <input id="monto" type="number" className="form-control" value={form.monto} onChange={actualizar} required />
          </div>

          <div className="col-md-3">
            <label className="form-label">Plazo (meses)</label>
            <input id="plazo" type="number" className="form-control" value={form.plazo} onChange={actualizar} required />
          </div>
        </div>

        {cuota && (
          <div className="alert alert-info mt-3">
            <strong>Cuota estimada:</strong> ${cuota.toLocaleString()} / mes
          </div>
        )}

        <button className="btn btn-success mt-3">Enviar Solicitud</button>

        {mensaje && <p className="text-success mt-3">{mensaje}</p>}
      </form>
    </main>
  );
}
