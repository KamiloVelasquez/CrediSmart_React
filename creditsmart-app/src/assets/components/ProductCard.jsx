import React from 'react'
import { Link } from 'react-router-dom'

// Tarjeta alternativa (no usada por defecto) con un placeholder de imagen
// Comentario: si la usas, asegúrate de pasar `product.img` o cambia la ruta.
export default function ProductCard({product}){
  const imgSrc = product?.img || '/src/assets/IMAGES/libre.png'
  return (
    <article className="card h-100 shadow-sm">
      <img src={imgSrc} className="card-img-top" alt={product?.name} style={{height:150, objectFit:'contain'}}/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product?.name}</h5>
        <p><strong className="text-success fs-4">{product?.rate}</strong></p>
        <p className="text-muted">{product ? `$${product.min.toLocaleString()} – $${product.max.toLocaleString()}` : ''}</p>
        <div className="mt-auto">
          <a className="btn btn-outline-primary btn-sm me-2" href="#">Ver detalles</a>
          <Link className="btn btn-success btn-sm" to="/solicitar">Solicitar</Link>
        </div>
      </div>
    </article>
  )
}
