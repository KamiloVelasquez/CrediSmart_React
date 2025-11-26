// src/pages/Home.jsx
import React from "react";
import { credits } from "../../data/credits";
import CreditCard from "../components/CreditCard";

// Página principal: lista los créditos disponibles
// Comentario: `credits` es un array en `src/data/credits.js` con los datos.
export default function Home() {
  return (
    <main className="container py-5">
      <h1 className="text-success mb-4">Nuestros Créditos</h1>

      <section className="row g-4" aria-live="polite">
        {credits.map((c) => (
          <div className="col-md-4" key={c.id}>
            <CreditCard product={c} />
          </div>
        ))}
      </section>
    </main>
  );
}
