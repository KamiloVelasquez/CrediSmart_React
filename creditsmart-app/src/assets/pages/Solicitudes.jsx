import React, { useState, useEffect } from "react";
// Asegúrate de que la ruta a tu config.js sea correcta
import { db } from "../../firebase/config"; 
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSolicitudes = async () => {
      try {
        setLoading(true);
        // Consulta: colección 'solicitudes', ordenada por fechaSolicitud descendente
        const q = query(
          collection(db, "solicitudes"),
          orderBy("fechaSolicitud", "desc")
        );

        const querySnapshot = await getDocs(q);
        
        const listaSolicitudes = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Convertir el Timestamp de Firestore a una cadena de fecha local
          // La cuotaEstimada se asume que existe porque el formulario la calcula antes de enviar
          const fechaFormateada = data.fechaSolicitud?.toDate()?.toLocaleString() || 'N/A';

          listaSolicitudes.push({
            id: doc.id,
            ...data,
            fechaSolicitud: fechaFormateada,
          });
        });

        setSolicitudes(listaSolicitudes);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar las solicitudes de Firestore:", err);
        setError("Error al cargar las solicitudes. Verifica las Reglas de Seguridad de Firestore.");
        setLoading(false);
      }
    };

    getSolicitudes();
  }, []); 

  if (loading) {
    return (
      <main className="container py-5 text-center">
        <h1 className="text-success">Cargando Solicitudes...</h1>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h1 className="custom-products-section text-success text-center mb-4">
        📊 Listado de Solicitudes de Crédito
      </h1>
      
      {solicitudes.length === 0 ? (
        <p className="text-center fs-5 text-muted">No hay solicitudes registradas.</p>
      ) : (
        <div className="table-responsive bg-white p-3 rounded shadow-lg">
          <table className="table table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo Crédito</th>
                <th>Monto ($)</th>
                <th>Cuota Est. ($)</th>
                <th>Plazo (meses)</th>
                <th>Fecha Solicitud</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((sol) => (
                <tr key={sol.id}>
                  <td>{sol.id.substring(0, 5)}...</td> 
                  <td>{sol.nombre}</td>
                  <td>{sol.tipoCredito}</td>
                  {/* Formateo de números */}
                  <td>{Number(sol.monto).toLocaleString()}</td>
                  <td>{sol.cuotaEstimada.toLocaleString()}</td>
                  <td>{sol.plazo}</td>
                  <td>{sol.fechaSolicitud}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-end text-muted small mt-3">Total de solicitudes: {solicitudes.length}</p>
        </div>
      )}
    </main>
  );
}