import React from "react";
import CreditCard from "../components/CreditCard";
import GreenBanner from "../components/GreenBanner"; // IMPORTACIÓN DEL BANNER
import { creditos } from "../../data/creditos";

export default function Home() {
  return (
    <>
      
      {/* Hero */}
      {/* <header className="p-5 text-center custom-bg-primary">
        <div className="container">
          <h1 className="display-7 fw-bold">Encuentra el Crédito Perfecto para Ti</h1>
          <p className="lead">Tasas competitivas, aprobación rápida y sin trámites complicados</p>
        </div>
      </header> */}

      {/*BANNER PUBLICITARIO INTERACTIVO */}
      <GreenBanner />

      {/* Catálogo (dinámico con .map) */}
      <main className="container custom-products-section py-3">
        <h2 className="custom-products-section">Nuestros Productos</h2>

        <div className="row g-4">
          {creditos.map((producto) => (
            // Pasamos las props con spread para respetar la firma del componente
            <CreditCard key={producto.id} {...producto} />
          ))}
        </div>
      </main>
    </>
  );
}
