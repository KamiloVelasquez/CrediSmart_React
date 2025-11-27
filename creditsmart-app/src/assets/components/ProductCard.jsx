import React from 'react'
import { Link } from 'react-router-dom'
import placeholder from '../IMAGES/libre.png'

// Tarjeta alternativa (compatible con ambos shapes de datos)
export default function ProductCard({ product }) {
  const imgSrc = product?.img || product?.image || placeholder
  const title = product?.nombre || product?.name || product?.title || ''
  const rate = product?.tasa ?? product?.rate ?? ''
  const minVal = product?.montoMin ?? product?.min ?? null
  const maxVal = product?.montoMax ?? product?.max ?? null

  const rangeText = (minVal != null && maxVal != null)
    ? `$${Number(minVal).toLocaleString()} – $${Number(maxVal).toLocaleString()}`
    : ''

  return (
    <article className="card h-100 shadow-sm">
      <img src={imgSrc} className="card-img-top" alt={title} style={{ height: 150, objectFit: 'contain' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p><strong className="text-success fs-4">{rate ? `${rate}%` : ''}</strong></p>
        <p className="text-muted">{rangeText}</p>
        <div className="mt-auto">
          <a className="btn btn-outline-primary btn-sm me-2" href="#">Ver detalles</a>
          <Link className="btn btn-success btn-sm" to="/solicitar">Solicitar</Link>
        </div>
      </div>
    </article>
  )
}
