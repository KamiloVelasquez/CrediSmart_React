import React from "react";
import CreditCard from "../components/CreditCard";
import { creditos } from "../../data/creditos";

export default function Home() {
  return (
    <>
      {/* Carrusel (igual estructura visual que tu HTML original) */}
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/IMAGES/Crédito Libre Inversión.png" className="d-block w-150" alt="Crédito Libre Inversión" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Crédito Libre Inversión</h5>
              <p>Financia lo que necesites sin justificar el gasto.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/IMAGES/Crédito Vehículo.png" className="d-block w-150" alt="Crédito Vehículo" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Crédito Vehículo</h5>
              <p>Tasas preferenciales para tu auto nuevo o usado.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/IMAGES/Crédito Vivienda.png" className="d-block w-150" alt="Crédito Vivienda" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Crédito Vivienda</h5>
              <p>Construye, compra o reforma tu hogar con condiciones especiales.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="/IMAGES/Crédito Educativo.png" className="d-block w-150" alt="Crédito Educativo" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Crédito Educativo</h5>
              <p>Invierte en tu futuro y el de tu familia.</p>
            </div>
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Hero */}
      <header className="p-5 text-center custom-bg-primary">
        <div className="container">
          <h1 className="display-7 fw-bold">Encuentra el Crédito Perfecto para Ti</h1>
          <p className="lead">Tasas competitivas, aprobación rápida y sin trámites complicados</p>
        </div>
      </header>

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
