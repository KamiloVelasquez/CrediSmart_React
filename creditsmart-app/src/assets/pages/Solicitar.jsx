import React, { useState, useMemo } from "react";
import { creditos } from "../../data/creditos"; 
import illustration from "../IMAGES/Credito_Libre_Inversion.png"; // ¡Verifica que esta ruta sea correcta!
import Swal from 'sweetalert2';
import { db } from "../../firebase/config"; 
import { collection, addDoc } from "firebase/firestore";


const validateForm = (form) => {
  let errors = {};
  if (!form.nombre) errors.nombre = "El nombre es obligatorio.";
  if (!form.cedula) errors.cedula = "La cédula es obligatoria.";
  if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "El email no es válido.";
  if (!form.telefono) errors.telefono = "El teléfono es obligatorio.";
  if (!form.tipoCredito) errors.tipoCredito = "Debes seleccionar un tipo de crédito.";
  
  const montoNum = Number(form.monto);
  const plazoNum = Number(form.plazo);
  const ingresosNum = Number(form.ingresos);

  if (!montoNum || isNaN(montoNum) || montoNum <= 0) errors.monto = "Monto inválido.";
  if (!plazoNum || isNaN(plazoNum) || plazoNum <= 0) errors.plazo = "Plazo inválido.";
  if (!ingresosNum || isNaN(ingresosNum) || ingresosNum <= 0) errors.ingresos = "Ingresos inválidos.";

  return errors;
};


export default function Solicitar() {
  const initialState = {
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
  };
  
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showResumen, setShowResumen] = useState(false);

  // Maneja el cambio de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Limpiar error específico al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Limpia todo el formulario
  const limpiarForm = () => {
    setForm(initialState);
    setErrors({});
    setShowResumen(false);
  };

  // Cálculo de cuota usando useMemo para optimización
  const cuota = useMemo(() => {
    const monto = Number(form.monto);
    const plazo = Number(form.plazo);
    if (!monto || !plazo) return null;

    const producto = creditos.find((c) => c.nombre === form.tipoCredito);
    // Tasa mensual (asumimos que la tasa en creditos.js es anual en porcentaje)
    const tasaMensual = producto ? Number(producto.tasa) / 100 : null; 

    if (!tasaMensual) return null;

    const i = tasaMensual;
    const n = plazo;
    const cuota = monto * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    
    if (isNaN(cuota) || !isFinite(cuota)) return null;

    return Math.round(cuota);
  }, [form.monto, form.plazo, form.tipoCredito]);


  // Muestra el resumen (calcula la cuota)
  const handleSimular = () => {
    const simErrors = {};
    if (!form.tipoCredito) simErrors.tipoCredito = "Selecciona un tipo de crédito.";
    if (!Number(form.monto)) simErrors.monto = "Ingresa un monto válido.";
    if (!Number(form.plazo)) simErrors.plazo = "Ingresa un plazo válido.";

    if (Object.keys(simErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...simErrors }));
        Swal.fire('Advertencia', 'Completa los campos de simulación para ver la cuota.', 'warning');
        return;
    }

    if (cuota) {
        setShowResumen(true);
    } else {
        setShowResumen(false);
        Swal.fire('Advertencia', 'No fue posible calcular la cuota. Verifica los límites del crédito.', 'warning');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. VALIDACIÓN COMPLETA
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).filter(key => validationErrors[key]).length > 0) {
      setErrors(validationErrors);
      Swal.fire('Advertencia', 'Por favor, completa correctamente los campos obligatorios.', 'warning');
      return;
    }
    
    // Asegurar que la cuota se calculó antes de enviar
    if (!cuota) {
        Swal.fire('Advertencia', 'Debes simular la cuota antes de enviar la solicitud.', 'warning');
        return;
    }

    // 2. PREPARACIÓN DE DATOS (Asegurar tipos correctos para Firestore)
    const dataToSave = {
      ...form,
      monto: Number(form.monto), 
      plazo: Number(form.plazo), 
      ingresos: Number(form.ingresos), 
      fechaSolicitud: new Date(), 
      cuotaEstimada: cuota, 
      // se puede añadir más campos como 'estado: "Pendiente"', 'tasaAplicada: producto.tasa', etc.
    };

    // 3. ENVÍO A FIRESTORE
    try {
      const docRef = await addDoc(collection(db, "solicitudes"), dataToSave); 
      
      // Éxito
      console.log("Documento escrito exitosamente con ID: ", docRef.id);
      
      Swal.fire(
        '¡Solicitud Enviada!',
        `Tu solicitud fue registrada con el ID: ${docRef.id}.`,
        'success'
      );
      
      limpiarForm();
      
    } catch (error) {
      
      console.error("FIREBASE ERROR: Error al añadir documento a Firestore.", error);
      
      Swal.fire(
        'Error de Envío',
        `Ocurrió un error al enviar tu solicitud: ${error.message}. Esto es CASI SIEMPRE un problema de las Reglas de Seguridad de Firestore.`,
        'error'
      );
    }
  };

  // Estructura de JSX con validaciones y manejo de eventos
  return (
    <main className="container py-5">
      <h1 className="custom-products-section text-success text-center">
        Solicita tu Crédito
      </h1>

      <div className="row">
        <div className="col-12 col-md-6 bg-light p-4 rounded shadow-lg">
          <form onSubmit={handleSubmit}>
            
            {/* Campos de datos personales */}
            <fieldset className="border p-3 mb-4 rounded">
              <legend className="float-none w-auto px-2 fs-6 fw-bold">
                Datos Personales
              </legend>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <small className="text-danger">{errors.nombre}</small>}
              </div>
              {/* ... otros campos de datos personales (cedula, email, telefono) con sus validaciones ... */}
              <div className="mb-3">
                <label htmlFor="cedula" className="form-label">Cédula</label>
                <input
                  type="text"
                  className={`form-control ${errors.cedula ? "is-invalid" : ""}`}
                  id="cedula"
                  name="cedula"
                  value={form.cedula}
                  onChange={handleChange}
                />
                {errors.cedula && <small className="text-danger">{errors.cedula}</small>}
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                    id="telefono"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                  />
                  {errors.telefono && <small className="text-danger">{errors.telefono}</small>}
                </div>
              </div>
              
            </fieldset>

            {/* Detalles del Crédito y Simulación */}
            <fieldset className="border p-3 mb-4 rounded">
              <legend className="float-none w-auto px-2 fs-6 fw-bold">
                Detalles del Crédito
              </legend>
              <div className="mb-3">
                <label htmlFor="tipoCredito" className="form-label">Tipo de Crédito</label>
                <select
                  className={`form-select ${errors.tipoCredito ? "is-invalid" : ""}`}
                  id="tipoCredito"
                  name="tipoCredito"
                  value={form.tipoCredito}
                  onChange={handleChange}
                >
                  <option value="">Selecciona un tipo</option>
                  {creditos.map((c) => (
                    <option key={c.id} value={c.nombre}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
                {errors.tipoCredito && <small className="text-danger">{errors.tipoCredito}</small>}
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="monto" className="form-label">Monto Solicitado ($)</label>
                  <input
                    type="number"
                    className={`form-control ${errors.monto ? "is-invalid" : ""}`}
                    id="monto"
                    name="monto"
                    value={form.monto}
                    onChange={handleChange}
                  />
                  {errors.monto && <small className="text-danger">{errors.monto}</small>}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="plazo" className="form-label">Plazo (meses)</label>
                  <input
                    type="number"
                    className={`form-control ${errors.plazo ? "is-invalid" : ""}`}
                    id="plazo"
                    name="plazo"
                    value={form.plazo}
                    onChange={handleChange}
                  />
                  {errors.plazo && <small className="text-danger">{errors.plazo}</small>}
                </div>
                <div className="col-md-4 mb-3 d-flex align-items-end">
                    <button type="button" className="btn btn-sm btn-outline-success w-100" onClick={handleSimular}>Simular Cuota</button>
                </div>
              </div>

              {/* ... Campos de Empleo e Ingresos ... */}
              <div className="mb-3">
                <label htmlFor="empresa" className="form-label">Empresa donde trabaja</label>
                <input type="text" className="form-control" id="empresa" name="empresa" value={form.empresa} onChange={handleChange} />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cargo" className="form-label">Cargo</label>
                  <input type="text" className="form-control" id="cargo" name="cargo" value={form.cargo} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="ingresos" className="form-label">Ingresos Mensuales ($)</label>
                  <input
                    type="number"
                    className={`form-control ${errors.ingresos ? "is-invalid" : ""}`}
                    id="ingresos"
                    name="ingresos"
                    value={form.ingresos}
                    onChange={handleChange}
                  />
                  {errors.ingresos && <small className="text-danger">{errors.ingresos}</small>}
                </div>
              </div>
            </fieldset>

            {/* Resumen y cuota */}
            {showResumen && cuota && (
              <div className="mb-3 p-3 bg-white rounded shadow-sm border-start border-4 border-success">
                <h6 className="fw-bold text-success">Resumen de Simulación</h6>
                <p className="mb-1"><strong>Tipo:</strong> {form.tipoCredito}</p>
                <p className="mb-1"><strong>Monto:</strong> ${Number(form.monto).toLocaleString()}</p>
                <p className="mb-1"><strong>Plazo:</strong> {form.plazo} meses</p>
                <hr className="my-2" />
                <h5 className="mb-0 text-success"><strong>Cuota estimada:</strong> ${cuota.toLocaleString()} / mes</h5>
              </div>
            )}
            
            {/* Mensaje de advertencia si la simulación falló */}
            {!cuota && showResumen && (
              <div className="alert alert-warning">
                No fue posible calcular la cuota. Revisa el tipo, monto y plazo.
              </div>
            )}


            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-outline-success" onClick={limpiarForm}>Limpiar Formulario</button>
              <button 
                type="submit" 
                className="btn btn-success" 
                disabled={!cuota} // Deshabilitar si la cuota no se ha simulado con éxito
              >
                Enviar Solicitud
              </button>
            </div>

          </form>
        </div>

        {/* IMAGEN A LA DERECHA: MODIFICADA PARA CUBRIR EL ESPACIO */}
        <div className="col-12 col-md-6 mt-4 mt-md-0 p-0 d-flex align-items-stretch">
          <img 
            src={illustration} 
            alt="Ilustración de crédito" 
            className="img-fluid rounded shadow" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover' // CLAVE: Asegura que la imagen cubra todo el contenedor sin distorsionarse
            }}
          />
        </div>
      </div>
    </main>
  );
}