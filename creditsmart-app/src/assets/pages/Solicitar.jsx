import React, { useState, useEffect } from "react";
import { creditos } from "../../data/creditos";
import illustration from "../IMAGES/Crédito Libre Inversión.png";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const solicitudesMemoria = []; // almacenamiento temporal en memoria

export default function Solicitar() {
  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    tipoCredito: "",
    monto: "",
    plazo: "",
    destino: "",
    empresa: "",
    cargo: "",
    ingresos: ""
  });

  const [errors, setErrors] = useState({});
  const [cuota, setCuota] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [showResumen, setShowResumen] = useState(false);

  // recalcular cuota cuando cambien monto, plazo o tipoCredito
  useEffect(() => {
    const monto = Number(form.monto);
    const plazo = Number(form.plazo);
    if (!monto || !plazo) {
      setCuota(null);
      return;
    }

    // obtener tasa (en creditos.tasa interpretada como porcentaje mensual)
    const producto = creditos.find((c) => c.nombre === form.tipoCredito);
    const tasaMensual = producto ? Number(producto.tasa) / 100 : 0.02; // fallback 2% mensual

    // fórmula cuota: (m * i) / (1 - (1+i)^-n)
    const i = tasaMensual;
    const n = plazo;
    const cuotaCalc = (monto * i) / (1 - Math.pow(1 + i, -n));
    if (Number.isFinite(cuotaCalc)) {
      setCuota(Math.round(cuotaCalc));
    } else {
      setCuota(null);
    }
  }, [form.monto, form.plazo, form.tipoCredito]);

  // validaciones en tiempo real (al cambiar campos)
  function handleChange(e) {
    const { id, value } = e.target;
    setForm((p) => ({ ...p, [id]: value }));

    // validación básica
    setErrors((prev) => {
      const next = { ...prev };
      if (!value) next[id] = "Campo requerido";
      else delete next[id];

      // email valid simple
      if (id === "email" && value) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!ok) next.email = "Email inválido";
        else delete next.email;
      }

      return next;
    });

    // si el usuario modifica monto/plazo/tipo, mostramos resumen en vivo
    setShowResumen(true);
  }

  function limpiarForm() {
    setForm({
      nombre: "",
      cedula: "",
      email: "",
      telefono: "",
      tipoCredito: "",
      monto: "",
      plazo: "",
      destino: "",
      empresa: "",
      cargo: "",
      ingresos: ""
    });
    setErrors({});
    setCuota(null);
    setShowResumen(false);
    setMensaje("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    // validación final
    const required = ["nombre", "email", "tipoCredito", "monto", "plazo"];
    const newErrors = {};
    required.forEach((f) => {
      if (!form[f]) newErrors[f] = "Campo requerido";
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setMensaje("Por favor completa los campos obligatorios.");
      return;
    }

    // guardar en memoria
    solicitudesMemoria.push({
      ...form,
      cuota,
      fecha: new Date().toISOString()
    });

      Swal.fire({
        title: "Solicitud enviada con éxito ✔",
        icon: "success",
        draggable: true
      });

    //setMensaje("Solicitud enviada con éxito ✔");
    //setShowResumen(false);

    // limpiar automáticamente después de enviar
    setTimeout(() => {
      limpiarForm();
    }, 800);

    // borrar mensaje al rato
    setTimeout(() => setMensaje(""), 5000);
  }

  return (
    <main className="container py-5">
      <h1 className="text-center mb-5 text-green">Solicitud de Crédito</h1>

      <div className="row gx-5 align-items-center">
        {/* Formulario a la izquierda */}
        <div className="col-12 col-md-6">
          <form className="bg-white p-4 rounded shadow-sm" onSubmit={handleSubmit} noValidate>
            {/* Datos personales */}
            <fieldset className="mb-4">
              <legend className="fw-bold text-green">Datos Personales</legend>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">Nombre completo</label>
                  <input id="nombre" value={form.nombre} onChange={handleChange} className="form-control" />
                  {errors.nombre && <small className="text-danger">{errors.nombre}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="cedula" className="form-label">Cédula</label>
                  <input id="cedula" type="number" value={form.cedula} onChange={handleChange} className="form-control" />
                  {errors.cedula && <small className="text-danger">{errors.cedula}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input id="email" type="email" value={form.email} onChange={handleChange} className="form-control" />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input id="telefono" value={form.telefono} onChange={handleChange} className="form-control" />
                  {errors.telefono && <small className="text-danger">{errors.telefono}</small>}
                </div>
              </div>
            </fieldset>

            {/* Datos del crédito */}
            <fieldset className="mb-4">
              <legend className="fw-bold text-green">Datos del Crédito</legend>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="tipoCredito" className="form-label">Tipo de crédito</label>
                  <select id="tipoCredito" value={form.tipoCredito} onChange={handleChange} className="form-select">
                    <option value="">Seleccione...</option>
                    {creditos.map((c) => (
                      <option key={c.id} value={c.nombre}>{c.nombre}</option>
                    ))}
                  </select>
                  {errors.tipoCredito && <small className="text-danger">{errors.tipoCredito}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="monto" className="form-label">Monto solicitado ($)</label>
                  <input id="monto" type="number" min="0" value={form.monto} onChange={handleChange} className="form-control" />
                  {errors.monto && <small className="text-danger">{errors.monto}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="plazo" className="form-label">Plazo en meses</label>
                  <select id="plazo" value={form.plazo} onChange={handleChange} className="form-select">
                    <option value="">Seleccione...</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                    <option value="48">48</option>
                    <option value="60">60</option>
                  </select>
                  {errors.plazo && <small className="text-danger">{errors.plazo}</small>}
                </div>

                <div className="col-12">
                  <label htmlFor="destino" className="form-label">Destino del crédito</label>
                  <textarea id="destino" value={form.destino} onChange={handleChange} rows="2" className="form-control" placeholder="Ej: Compra de vehículo, remodelación, etc."></textarea>
                </div>
              </div>
            </fieldset>

            {/* Datos laborales */}
            <fieldset className="mb-4">
              <legend className="fw-bold text-green">Datos Laborales</legend>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="empresa" className="form-label">Empresa donde trabaja</label>
                  <input id="empresa" value={form.empresa} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="cargo" className="form-label">Cargo</label>
                  <input id="cargo" value={form.cargo} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="ingresos" className="form-label">Ingresos mensuales ($)</label>
                  <input id="ingresos" type="number" min="0" value={form.ingresos} onChange={handleChange} className="form-control" />
                </div>
              </div>
            </fieldset>

            {/* Resumen y cuota */}
            {showResumen && (
              <div className="mb-3">
                <h6 className="fw-bold">Resumen (preliminar)</h6>
                <p className="mb-1"><strong>Tipo:</strong> {form.tipoCredito || "-"}</p>
                <p className="mb-1"><strong>Monto:</strong> {form.monto ? `$${Number(form.monto).toLocaleString()}` : "-"}</p>
                <p className="mb-1"><strong>Plazo:</strong> {form.plazo ? `${form.plazo} meses` : "-"}</p>
                <p className="mb-1"><strong>Cuota estimada:</strong> {cuota ? `$${cuota.toLocaleString()} / mes` : "—"}</p>
              </div>
            )}

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-outline-primary" onClick={limpiarForm}>Limpiar</button>
              <button type="submit" className="btn btn-success">Enviar Solicitud</button>
            </div>

            {mensaje && <div className="mt-3 alert alert-success">{mensaje}</div>}
          </form>
        </div>

        {/* Imagen a la derecha (oculta en pantallas muy pequeñas) */}
        <div className="col-12 col-md-6 mt-4 mt-md-0">
          <div className="h-100 d-flex align-items-center justify-content-center">
            <img src={illustration} alt="Crédito" className="img-fluid rounded shadow-sm" style={{ maxHeight: 520, objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </main>
  );
}
